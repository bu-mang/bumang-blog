import * as THREE from "three";

class ASCIIEffect {
  private renderer: THREE.WebGLRenderer;
  private charSet: string;
  private resolution: number;
  private renderTarget: THREE.WebGLRenderTarget;
  private width: number;
  private height: number;
  public domElement: HTMLDivElement;

  constructor(
    renderer: THREE.WebGLRenderer,
    charSet: string = " .:-=+*#%@",
    resolution: number = 0.15,
  ) {
    this.renderer = renderer;
    this.charSet = charSet;
    this.resolution = resolution;
    this.width = 0;
    this.height = 0;

    // ASCII 출력용 DOM 요소 생성
    this.domElement = document.createElement("div");
    this.domElement.style.fontFamily = "Courier New, monospace";
    this.domElement.style.fontSize = "8px";
    this.domElement.style.lineHeight = "8px";
    this.domElement.style.whiteSpace = "pre";
    this.domElement.style.color = "#b4b4b4";

    this.domElement.style.transform = "scaleX(1.5)"; // 가로만 2배 확대
    this.domElement.style.transformOrigin = "left top";

    // 렌더 타겟 설정
    this.renderTarget = new THREE.WebGLRenderTarget(
      Math.floor(window.innerWidth * resolution),
      Math.floor(window.innerHeight * resolution),
    );

    this.setSize(window.innerWidth, window.innerHeight);
  }

  public setSize(width: number, height: number): void {
    this.width = Math.floor(width * this.resolution);
    this.height = Math.floor(height * this.resolution);
    this.renderTarget.setSize(this.width, this.height);

    // ASCII 문자 비율 보정 (문자는 세로가 더 김)
  }

  public render(scene: THREE.Scene, camera: THREE.Camera): void {
    // 오프스크린에 렌더링
    this.renderer.setRenderTarget(this.renderTarget);
    this.renderer.render(scene, camera);
    this.renderer.setRenderTarget(null);

    // 픽셀 데이터 읽기
    const pixels = new Uint8Array(this.width * this.height * 4);
    this.renderer.readRenderTargetPixels(
      this.renderTarget,
      0,
      0,
      this.width,
      this.height,
      pixels,
    );

    // ASCII 변환
    let ascii: string = "";
    for (let y = this.height - 1; y >= 0; y--) {
      // 상하반전 해결
      for (let x = 0; x < this.width; x++) {
        const i: number = (y * this.width + x) * 4;
        const brightness: number =
          (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        const charIndex: number = Math.floor(
          (brightness / 255) * (this.charSet.length - 1),
        );
        ascii += this.charSet[charIndex];
      }
      ascii += "\n";
    }

    this.domElement.textContent = ascii;
  }
}

export default ASCIIEffect;
