import { useInteractiveStore } from "@/store/background";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Ascii3DBackground() {
  const bgColor = useInteractiveStore((state) => state.backgroundColor);
  const bgImage = useInteractiveStore((state) => state.backgroundImage);

  const threeRef = useRef<HTMLDivElement>(null); // DOM 요소 참조

  useEffect(() => {
    if (threeRef.current && typeof window !== "undefined") {
      // 1. Renderer 만들기 (화가)
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // 2. DOM에 canvas 추가
      threeRef.current.appendChild(renderer.domElement);

      // 3. Scene 만들기 (3D공간)
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff); // 흰색 배경

      // 4. Camera 만들기 (관객 시점)
      // OrthographicCamera: 도면 카메라
      // PerspectiveCamera: 원근 카메라 (실제 현실 카메라)
      const camera = new THREE.PerspectiveCamera(
        50, // 시야각 (FOV), 클수록 광각, 작을수록 망원
        window.innerWidth / window.innerHeight, // 화면 비율 (가로/세로)
        0.1, // Near Plane (이것보다 가까이 있으면 안 보임)
        1000, // Far Plane (먼 거리)
      );

      // 5. 카메라 위치 조정
      camera.position.z = 7.5; // 카메라를 뒤로 5만큼 빼기

      // 6. 오브젝트 만들기
      // const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // 구
      // const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32); // 원통
      // const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100); // 도넛 (ASCII 예제에서 쓴 것!)

      // // 7. 마테리얼 설정
      // const greenMaterial = new THREE.MeshBasicMaterial({
      //   color: 0x00ff00,
      // }); // 초록

      // const shinyMaterial = new THREE.MeshPhongMaterial({
      //   color: 0xff6b6b,
      //   shininess: 100, // 반짝임 정도
      //   specular: 0x1188ff, // 반사 색깔
      // });

      // const metalMaterial = new THREE.MeshPhongMaterial({
      //   color: 0x888888, // 회색 베이스
      //   shininess: 200, // 매우 반짝임 (기본: 30)
      //   specular: 0xffffff, // 흰색 반사광
      // });

      // const matteMaterial = new THREE.MeshPhongMaterial({
      //   color: 0x8b4513, // 갈색
      //   shininess: 5, // 거의 안 반짝임
      //   specular: 0x111111, // 어두운 반사광
      // });

      // const glassMaterial = new THREE.MeshPhongMaterial({
      //   color: 0x87ceeb,
      //   transparent: true, // 투명도 활성화
      //   opacity: 0.3, // 30% 불투명
      //   shininess: 100,
      // });

      // const goldMaterial = new THREE.MeshStandardMaterial({
      //   color: 0xffd700, // 금색
      //   metalness: 1.0, // 100% 금속성
      //   roughness: 0.1, // 10% 거칠기 (매끄러움)
      // });

      // // 나무
      // const woodMaterial = new THREE.MeshStandardMaterial({
      //   color: 0x8b4513, // 갈색
      //   metalness: 0.0, // 0% 금속성 (비금속)
      //   roughness: 0.8, // 80% 거칠기
      // });

      // // 플라스틱
      // const plasticMaterial = new THREE.MeshStandardMaterial({
      //   color: 0xff6b6b,
      //   metalness: 0.0,
      //   roughness: 0.4, // 중간 거칠기
      // });

      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(10, 10, 5);
      const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x444444, 0.3);

      scene.add(ambientLight);
      scene.add(directionalLight);
      scene.add(hemiLight);

      // const sphere = new THREE.Mesh(sphereGeometry, goldMaterial);
      // const cylinder = new THREE.Mesh(cylinderGeometry, woodMaterial);
      // const torus = new THREE.Mesh(torusGeometry, plasticMaterial);

      // // 일렬로 배치
      // torus.position.x = 2; // 오른쪽
      // torus.position.y = 2; // 오른쪽
      // cylinder.position.y = -2; // 가운데
      // sphere.position.x = -2; // 왼쪽
      // sphere.position.y = -2; // 왼쪽

      // 7. 렌더링 (그림 그리기)
      renderer.render(scene, camera);

      let lily: THREE.Group | null = null;

      const loader = new GLTFLoader();
      loader.load(
        "/models/lily.glb",
        (gltf) => {
          lily = gltf.scene;
          lily.position.set(2, -1, 0); // 위치 조절
          lily.scale.set(5, 5, 5);
          scene.add(lily);
        },
        undefined,
        (error) => {
          console.error("모델 로드 실패:", error);
        },
      );

      // OrbitControls 추가
      const controls = new OrbitControls(camera, renderer.domElement);

      // 설정 (선택사항)
      controls.enableDamping = true; // 부드러운 감속
      controls.dampingFactor = 0.05; // 감속 정도
      controls.enableZoom = false; // 줌 허용
      controls.enableRotate = true; // 회전 허용
      controls.enablePan = false; // 패닝 허용

      // 애니메이션 루프에서 업데이트 필요
      function animate() {
        if (lily) {
          lily.rotation.y += 0.0025; // 회전 애니메이션
        }

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();
    }
  }, []);

  return (
    <div className="fixed left-0 top-0 h-screen w-screen">
      <div ref={threeRef} className="h-full w-full" />
      {/* <div className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center">
        In Progress...
      </div> */}
    </div>
  );
}
