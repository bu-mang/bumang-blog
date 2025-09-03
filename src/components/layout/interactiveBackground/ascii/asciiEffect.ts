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
    charSet: string = "█▉▊▋▌▍▎▏ ",
    resolution: number = 0.15,
  ) {
    this.renderer = renderer;
    this.charSet = charSet;
    this.resolution = resolution;
    this.width = 0;
    this.height = 0;

    // ASCII 출력용 DOM 요소 생성
    this.domElement = document.createElement("div");

    // 기본 스타일 설정
    this.domElement.style.fontFamily =
      '"Consolas", "Liberation Mono", "Menlo", "Courier New", monospace';
    this.domElement.style.whiteSpace = "pre";
    this.domElement.style.color = "#b4b4b4";
    this.domElement.style.overflow = "hidden";
    this.domElement.style.userSelect = "none";
    const isWindows = navigator.userAgent.indexOf("Windows") > -1;
    const isMac = navigator.userAgent.indexOf("Mac") > -1;

    // OS별 최적화된 스타일
    if (isWindows) {
      this.domElement.style.fontSize = "6px";
      this.domElement.style.lineHeight = "6px";
      this.domElement.style.letterSpacing = "0px";
      this.domElement.style.transform = "scaleX(1.2)";
      this.domElement.style.fontWeight = "bold";

      // Windows용 폰트 스무딩 - CSS 속성으로 안전하게 설정
      this.domElement.style.setProperty("-webkit-font-smoothing", "none");
      this.domElement.style.setProperty("font-smooth", "never");
    } else if (isMac) {
      this.domElement.style.fontSize = "8px";
      this.domElement.style.lineHeight = "8px";
      this.domElement.style.letterSpacing = "0px";
      this.domElement.style.transform = "scaleX(1.5)";

      // macOS용 폰트 스무딩 - CSS 속성으로 안전하게 설정
      this.domElement.style.setProperty(
        "-webkit-font-smoothing",
        "antialiased",
      );
      this.domElement.style.setProperty("-moz-osx-font-smoothing", "grayscale");
    } else {
      // Linux 등 기타 OS
      this.domElement.style.fontSize = "7px";
      this.domElement.style.lineHeight = "7px";
      this.domElement.style.letterSpacing = "0px";
      this.domElement.style.transform = "scaleX(1.3)";
    }

    this.domElement.style.transformOrigin = "left top";

    // 렌더 타겟 설정
    this.renderTarget = new THREE.WebGLRenderTarget(
      Math.floor(window.innerWidth * resolution),
      Math.floor(window.innerHeight * resolution),
    );

    this.setSize(window.innerWidth, window.innerHeight);
  }

  public setSize(width: number, height: number): void {
    // OS별 해상도 조정
    const isWindows = navigator.userAgent.indexOf("Windows") > -1;
    const adjustedResolution = isWindows
      ? this.resolution * 0.8
      : this.resolution;

    this.width = Math.floor(width * adjustedResolution);
    this.height = Math.floor(height * adjustedResolution);
    this.renderTarget.setSize(this.width, this.height);
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

    // let ascii: string = "";
    // for (let y = this.height - 1; y >= 0; y--) {
    //   for (let x = 0; x < this.width; x++) {
    // const i: number = (y * this.width + x) * 4;

    // // R, G, B 값의 평균을 냄
    // const brightness: number =
    //   (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;

    // // 나누기 255 곱하기 charSet.length로 index를 생성
    // const charIndex: number = Math.floor(
    //   (brightness / 255) * (this.charSet.length - 1),
    // );

    // // 해당하는 index의 문자열을 ascii 결과물에 붙이기
    // ascii += this.charSet[charIndex];
    // }

    //   // 한 줄 끝나면 줄바꿈 추가
    // ascii += "\n";
    // }

    // this.domElement.textContent = ascii;

    // ASCII 변환 최적화
    const lines: string[] = [];

    for (let y = this.height - 1; y >= 0; y--) {
      let line = "";
      for (let x = 0; x < this.width; x++) {
        const i: number = (y * this.width + x) * 4;

        // R, G, B 값의 평균을 냄
        const brightness: number =
          (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;

        // 나누기 255 곱하기 charSet.length로 index를 생성
        const charIndex: number = Math.floor(
          (brightness / 255) * (this.charSet.length - 1),
        );

        // 해당하는 index의 문자열을 ascii 결과물에 붙이기
        line += this.charSet[charIndex];
      }
      lines.push(line);
    }

    // 한 번에 DOM 업데이트 (성능 최적화)
    this.domElement.textContent = lines.join("\n");
  }
}

export default ASCIIEffect;
