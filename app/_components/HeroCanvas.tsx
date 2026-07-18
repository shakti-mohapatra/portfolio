"use client";

import { useEffect, useRef, useState } from "react";

const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos,0.0,1.0); }`;

const FRAG = `precision highp float;
uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse; uniform float u_mode;
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m; vec3 x=2.0*fract(p*C.www)-1.0; vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5); vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}
float fbm(vec2 p){ float s=0.0,a=0.5; for(int i=0;i<5;i++){ s+=a*snoise(p); p*=2.0; a*=0.5; } return s; }
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; vec2 p=uv-0.5; p.x*=u_res.x/u_res.y;
  vec2 mo=u_mouse/u_res-0.5; mo.x*=u_res.x/u_res.y;
  float t=u_time*0.05;
  vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(p+1.6*q+vec2(1.7,9.2)+0.25*mo),fbm(p+1.6*q+vec2(8.3,2.8)-0.25*mo));
  float f=fbm(p+1.9*r+t); f=0.5+0.5*f;
  vec3 c1=mix(vec3(0.024,0.024,0.031),vec3(0.018,0.026,0.036),u_mode);
  vec3 c2=mix(vec3(0.16,0.10,0.42),vec3(0.07,0.15,0.40),u_mode);
  vec3 c3=mix(vec3(0.55,0.36,0.96),vec3(0.18,0.48,0.92),u_mode);
  vec3 c4=mix(vec3(0.91,0.47,0.98),vec3(0.28,0.86,0.86),u_mode);
  vec3 col=mix(c1,c2,smoothstep(0.0,0.55,f));
  col=mix(col,c3,smoothstep(0.45,0.85,f));
  col=mix(col,c4,smoothstep(0.78,1.05,f)*(0.5+0.5*length(r)));
  col*=1.0-0.55*dot(p,p);
  gl_FragColor=vec4(col,1.0);
}`;

function initHeroGL(canvas: HTMLCanvasElement, mode: number): (() => void) | null {
  const gl =
    (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
    (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
  if (!gl) return null;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
    return s;
  };

  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uTime  = gl.getUniformLocation(prog, "u_time");
  const uRes   = gl.getUniformLocation(prog, "u_res");
  const uMouse = gl.getUniformLocation(prog, "u_mouse");
  const uMode  = gl.getUniformLocation(prog, "u_mode");

  const mouse  = { x: 0.5, y: 0.5 };
  const target = { x: 0.5, y: 0.5 };
  let raf = 0;
  let visible = true;
  const start = performance.now();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width  = Math.floor(canvas.clientWidth  * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  const onMove = (e: MouseEvent) => {
    target.x = e.clientX / window.innerWidth;
    target.y = 1 - e.clientY / window.innerHeight;
  };
  const loop = () => {
    if (!visible) { raf = 0; return; }
    // Slowed from 0.05 -> 0.02 for a dreamlike drift instead of snap
    mouse.x += (target.x - mouse.x) * 0.02;
    mouse.y += (target.y - mouse.y) * 0.02;
    const t = (performance.now() - start) / 1000;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uRes,   canvas.width, canvas.height);
    gl.uniform2f(uMouse, mouse.x * canvas.width, mouse.y * canvas.height);
    gl.uniform1f(uMode,  mode);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(loop);
  };
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (visible && !raf) loop();
    },
    { threshold: 0 }
  );
  io.observe(canvas);

  resize();
  window.addEventListener("resize",    resize);
  window.addEventListener("mousemove", onMove);
  loop();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize",    resize);
    window.removeEventListener("mousemove", onMove);
    io.disconnect();
  };
}

// The mode is fixed per route, so the old violet<->blue morph lerp is gone: the
// uniform is set once at init.
export default function HeroCanvas({ mode }: { mode: "side" | "day" }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const cleanup = initHeroGL(ref.current, mode === "day" ? 1 : 0);
    if (!cleanup) { setFailed(true); return; }
    return cleanup;
  }, [mode]);
  return (
    <>
      {failed && (
        <div
          className="hero-fallback"
          style={mode === "day" ? {
            background:
              "radial-gradient(60% 60% at 70% 30%, rgba(56,132,255,0.45), transparent 70%), radial-gradient(50% 50% at 25% 75%, rgba(45,212,191,0.32), transparent 70%), var(--surface)",
          } : undefined}
        />
      )}
      <canvas
        ref={ref}
        className="hero-canvas"
        style={{ display: failed ? "none" : "block" }}
        aria-hidden
      />
    </>
  );
}
