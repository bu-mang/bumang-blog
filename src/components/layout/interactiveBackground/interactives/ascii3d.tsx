import { useInteractiveStore } from "@/store/background";
import Image from "next/image";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Ascii3DBackground() {
  const bgColor = useInteractiveStore((state) => state.backgroundColor);
  const bgImage = useInteractiveStore((state) => state.backgroundImage);
  // const { centerText } = useInteractiveStore((state) => state.work); // 옵션들

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
      camera.position.z = 5; // 카메라를 뒤로 5만큼 빼기

      // 6. 오브젝트 만들기
      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // 구
      const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32); // 원통
      const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100); // 도넛 (ASCII 예제에서 쓴 것!)

      // 7. 마테리얼 설정
      const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // 빨강
      const greenMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      }); // 초록
      const blueMaterial = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.6,
      }); // 파랑
      const shinyMaterial = new THREE.MeshPhongMaterial({
        color: 0xff6b6b,
        shininess: 100, // 반짝임 정도
        specular: 0x1188ff, // 반사 색깔
      });

      // 하지만 조명이 있어야 효과 보임!
      const light = new THREE.DirectionalLight(0x404040, 1);
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      light.position.set(5, 5, 5);
      scene.add(light);
      scene.add(ambientLight);

      // const sphere = new THREE.Mesh(sphereGeometry, redMaterial); // 완성품
      // const cylinder = new THREE.Mesh(cylinderGeometry, blueMaterial); // 완성품
      // const torus = new THREE.Mesh(torusGeometry, shinyMaterial); // 완성품

      const sphere = new THREE.Mesh(sphereGeometry, greenMaterial); // 완성품
      const cylinder = new THREE.Mesh(cylinderGeometry, greenMaterial); // 완성품
      const torus = new THREE.Mesh(torusGeometry, greenMaterial); // 완성품

      // 일렬로 배치
      torus.position.x = 3; // 오른쪽
      torus.position.y = 3; // 오른쪽
      cylinder.position.x = 0; // 가운데
      sphere.position.x = -3; // 왼쪽
      sphere.position.y = -3; // 왼쪽

      scene.add(sphere); // 무대에 올리기
      scene.add(cylinder); // 무대에 올리기
      scene.add(torus); // 무대에 올리기

      // 7. 렌더링 (그림 그리기)
      renderer.render(scene, camera);
    }
  }, []);

  return (
    <div className="fixed left-0 top-0 h-screen w-screen">
      <div ref={threeRef} className="h-full w-full" />
      <div className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center">
        In Progress...
      </div>
    </div>
  );
}
