"use client";

import ListItemView from "./workList/listItemView";
import GridItemView from "./workList/gridItemView";

import useQueryProps from "@/hooks/useQueryProps";
import { WorkItem } from "@/types/item";
import usePathProps from "@/hooks/usePathProps";

const mockWorkItems: WorkItem[] = [
  {
    id: "1",
    title: "Link Sorter",
    desc: "The Most Compact Way to Manage Your Links across your Devices",
    categoryType: "main-project",
    bgImage:
      "https://images.unsplash.com/photo-1726243204340-becde5d070db?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "#931B08",
    platform: ["WEB", "MOBILE"],
    date: {
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-03-01"),
    },
    createAt: new Date("2023-03-01"),
    roleMain: "FullStack",
    roleDetail: ["Frontend", "Backend", "Deployment"],
    stack: [
      {
        title: "Frontend",
        subCategories: [{ title: "React" }, { title: "TypeScript" }],
      },
      {
        title: "Backend",
        subCategories: [{ title: "Node.js" }, { title: "Express" }],
      },
    ],
    participants: "Solo Project",
    link: {
      github: "https://github.com/example/portfolio",
      deploy: "https://example.com",
    },
    admin: {
      id: "admin123",
      password: "securePassword",
    },
  },
  {
    id: "2",
    title: "Yin Tarot",
    desc: "The Most Compact Way to Manage Your Links across your Devices. The Most Compact Way to Manage Your Links across your Devices. The Most Compact Way to Manage Your Links across your Devices.",
    categoryType: "main-project",
    bgImage:
      "https://images.unsplash.com/photo-1603793516210-5cf879f819af?q=80&w=3391&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "#1F3D4B",
    platform: ["WEB", "MOBILE"],
    date: {
      startDate: new Date("2022-08-01"),
      endDate: new Date("2022-12-01"),
    },
    createAt: new Date("2022-12-05"),
    roleMain: "Front",
    roleDetail: ["UI/UX Design", "Frontend Development", "API Integration"],
    stack: [
      {
        title: "Frontend",
        subCategories: [{ title: "Vue.js" }, { title: "TailwindCSS" }],
      },
      {
        title: "Backend",
        subCategories: [{ title: "Laravel" }],
      },
    ],
    participants: "Team Project",
    link: {
      github: "https://github.com/example/ecommerce",
      deploy: "https://shop.example.com",
    },
  },
  {
    id: "3",
    title: "Chat",
    desc: "The Most Compact Way to Manage Your Links across your Devices",
    categoryType: "toy-project",
    bgImage:
      "https://images.unsplash.com/photo-1724247112471-ced6af8fb81b?q=80&w=3435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "#12303F",
    platform: ["WEB", "MOBILE"],
    date: {
      startDate: new Date("2022-08-01"),
      endDate: new Date("2022-12-01"),
    },
    createAt: new Date("2021-06-01"),
    roleMain: "Back",
    roleDetail: [
      "Backend Development",
      "Real-time Features",
      "Database Management",
    ],
    stack: [
      {
        title: "Backend",
        subCategories: [{ title: "Node.js" }, { title: "Socket.IO" }],
      },
      {
        title: "Database",
        subCategories: [{ title: "MongoDB" }],
      },
    ],
    participants: "Team Project",
    link: {
      github: "https://github.com/example/chatapp",
      deploy: "https://chat.example.com",
    },
  },
];

const ItemListDeck = () => {
  const { list } = useQueryProps();
  const { minorPathname } = usePathProps();

  if (minorPathname.length > 1) {
    const pathname = minorPathname.split("/").join("");

    return (
      <div className="flex flex-col gap-4">
        {(list === "list" || !list) &&
          mockWorkItems.map(
            (item) =>
              item.categoryType === pathname && (
                <ListItemView //
                  categoryType={item.categoryType}
                  bgColor={item.bgColor}
                  platform={item.platform}
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  desc={item.desc}
                  bgImage={item.bgImage}
                  date={item.date}
                  createAt={item.createAt}
                  roleMain={item.roleMain}
                  roleDetail={item.roleDetail}
                  stack={item.stack}
                  participants={item.participants}
                  link={item.link}
                  admin={item.admin}
                />
              ),
          )}
        {list === "grid" && <GridItemView />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {(list === "list" || !list) &&
        mockWorkItems.map((item) => (
          <ListItemView //
            categoryType={item.categoryType}
            bgColor={item.bgColor}
            platform={item.platform}
            key={item.id}
            id={item.id}
            title={item.title}
            desc={item.desc}
            bgImage={item.bgImage}
            date={item.date}
            createAt={item.createAt}
            roleMain={item.roleMain}
            roleDetail={item.roleDetail}
            stack={item.stack}
            participants={item.participants}
            link={item.link}
            admin={item.admin}
          />
        ))}
      {list === "grid" && <GridItemView />}
    </div>
  );
};

export default ItemListDeck;
