import Link from "next/link";
import { SectionBox, SubBox } from "./_box";

export default function Blog() {
  return (
    <main className="">
      <div className="mb-[4vw] grid h-fit w-full auto-rows-[4vw] grid-cols-8 gap-x-[1vw] gap-y-[1vw] px-[3vw]">
        <div className="col-start-1 col-end-3 row-start-1 row-end-4 bg-gray-50"></div>
        <div className="col-start-5 col-end-9 row-start-1 row-end-6 bg-gray-50"></div>
        <div className="col-start-3 col-end-4 row-start-6 row-end-9 bg-gray-50"></div>
      </div>
      <SectionBox>
        <div className="col-span-3 text-6xl font-semibold">Hello!</div>
        <div className="col-span-1 translate-y-1.5 font-semibold">I AM</div>
        <div className="col-span-4 mb-6 grid grid-cols-4">
          <span className="col-span-4 mb-1 text-6xl font-semibold">
            Bumang!
          </span>
          <span className="col-span-4 mb-3 text-6xl font-semibold">
            Who loves Interactives
          </span>
          <p className="col-span-3">
            I majored in Industrial design and worked as a UX designer before
            transitioning to frontend development. I have a passion for art and
            enjoy drawing as a hobby. I&apos;m particularly interested in
            creating interactive 2D/3D content on the web, exploring WebGL and
            Canvas. My goal is to become a full-stack developer, and I enjoy
            working on solo development projects and experimenting with new
            technologies. I&apos;m always open to exciting side project ideas!
          </p>
        </div>
        <div className="col-start-4 col-end-9">
          <SubBox>
            <span className="col-span-1 font-semibold">Moblie</span>
            <span className="col-span-4">+82 10-4922-3563</span>
          </SubBox>
          <SubBox>
            <span className="col-span-1 font-semibold">Email</span>
            <span className="col-span-4">Baughman0729@gmail.com</span>
          </SubBox>
          <SubBox className="mb-16">
            <span className="col-span-1 font-semibold">Links</span>
            <div className="col-span-4 flex gap-2 text-gray-200">
              <Link
                href={""}
                className="transition-all hover:bg-gray-800 hover:text-white"
              >
                Notion
              </Link>
              <Link
                href={""}
                className="transition-all hover:bg-gray-800 hover:text-white"
              >
                Behance
              </Link>
              <Link
                href={""}
                className="transition-all hover:bg-gray-800 hover:text-white"
              >
                Instagram
              </Link>
            </div>
          </SubBox>
        </div>
      </SectionBox>
      <SectionBox>
        <div className="col-span-3 text-6xl font-semibold">Awards</div>
        <div className="col-start-4 col-end-9 -translate-y-3">
          <SubBox className="border-none">
            <div className="col-span-1 font-semibold">2023</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Yanolja X Fast Campus Frontend Tech School
              </span>
              <span className="text-gray-300">Outstanding Graduate</span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2022</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Naver Boostcourse Python Coaching Study
              </span>
              <span className="text-gray-300">Lead Booster</span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2021</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Kakao x Korea Tourism Organization Travel Data Contest
              </span>
              <span className="text-gray-300">
                Grand Prize - Participated as a UX Designer
              </span>
            </div>
          </SubBox>
          <SubBox className="mb-16">
            <div className="col-span-1 font-semibold">2019</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                University of Seoul Jangsangotmae Mascot Graphic Design Contest
              </span>
              <span className="text-gray-300">Second Prize</span>
            </div>
          </SubBox>
        </div>
      </SectionBox>
      <SectionBox>
        <div className="col-span-3 flex flex-col gap-2 text-6xl font-semibold">
          <span>Main</span>
          <span>TechStack</span>
        </div>
        <div className="col-start-4 col-end-9 -translate-y-3">
          <SubBox className="border-none">
            <div className="col-span-1 font-semibold">2023</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Yanolja X Fast Campus Frontend Tech School
              </span>
              <span className="text-gray-300">Outstanding Graduate</span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2022</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Naver Boostcourse Python Coaching Study
              </span>
              <span className="text-gray-300">Lead Booster</span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2021</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Kakao x Korea Tourism Organization Travel Data Contest
              </span>
              <span className="text-gray-300">
                Grand Prize - Participated as a UX Designer
              </span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2019</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                University of Seoul Jangsangotmae Mascot Graphic Design Contest
              </span>
              <span className="text-gray-300">Second Prize</span>
            </div>
          </SubBox>
        </div>
      </SectionBox>
      <SectionBox>
        <div className="col-span-3 flex flex-col text-6xl font-semibold">
          <span>Basic</span>
          <span>Level in</span>
        </div>
        <div className="col-start-4 col-end-9 -translate-y-3">
          <SubBox className="border-none">
            <div className="col-span-1 font-semibold">2023</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Yanolja X Fast Campus Frontend Tech School
              </span>
              <span className="text-gray-300">Outstanding Graduate</span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2022</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Naver Boostcourse Python Coaching Study
              </span>
              <span className="text-gray-300">Lead Booster</span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2021</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                Kakao x Korea Tourism Organization Travel Data Contest
              </span>
              <span className="text-gray-300">
                Grand Prize - Participated as a UX Designer
              </span>
            </div>
          </SubBox>
          <SubBox>
            <div className="col-span-1 font-semibold">2019</div>
            <div className="col-span-4 flex flex-col">
              <span className="font-semibold">
                University of Seoul Jangsangotmae Mascot Graphic Design Contest
              </span>
              <span className="text-gray-300">Second Prize</span>
            </div>
          </SubBox>
        </div>
      </SectionBox>
    </main>
  );
}

// "디자인을 전공하고 UX 디자이너로 일하다가, 지금은 프론트엔드 개발자로 활동하고 있습니다. 예술을 좋아하고, 그림 그리기를 취미로 삼고 있습니다. 웹에서 2D/3D 인터랙티브 콘텐츠를 구현하는 것에 흥미가 많으며, WebGL과 Canvas를 탐구하고 있습니다. 풀스택 개발자로 성장하는 것을 목표로 하며, 1인 개발과 다양한 기술 실험을 즐깁니다. 재미있는 사이드 프로젝트 제안은 언제든 환영합니다!"

//

//

//

//
