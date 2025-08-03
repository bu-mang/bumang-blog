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
    // --------------------------------------------------------------------
    // 일반 렌더링 (DOM에 보임)
    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(x, y);
    // document.body.appendChild(renderer.domElement); // ← DOM에 추가
    // renderer.render(scene, camera); // → 화면에 보임
    // --------------------------------------------------------------------

    // 오프스크린에 렌더링
    // setRenderTarget은 초기는 null이다. 기본 타겟은 domElement다.
    this.renderer.setRenderTarget(this.renderTarget); // 렌더 타겟을 세팅
    this.renderer.render(scene, camera); // 렌더
    this.renderer.setRenderTarget(null); // 렌더 후 렌더타깃 초기화

    // 픽셀 데이터 읽기
    // 가로 x 세로 x 4 (rgba가 4자리이기 때문)가 들어가는 Array 설정
    const pixels = new Uint8Array(this.width * this.height * 4);
    this.renderer.readRenderTargetPixels(
      this.renderTarget, // 어떤 가상 캔버스에서
      0, // X 시작점 (왼쪽 끝)
      0, // Y 시작점 (아래쪽 끝)
      this.width, // 가로로 얼마나 읽을지
      this.height, // 세로로 얼마나 읽을지
      pixels, // 읽은 데이터를 어디에 저장할지
    );

    // ASCII 변환
    let ascii: string = "";
    // three.js 좌표계는 좌측 하단부터여서, y축을 마이너스 방향으로.
    for (let y = this.height - 1; y >= 0; y--) {
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
        ascii += this.charSet[charIndex];
      }

      // 한 줄 끝나면 줄바꿈 추가
      ascii += "\n";
    }

    this.domElement.textContent = ascii;
  }
}

export default ASCIIEffect;
