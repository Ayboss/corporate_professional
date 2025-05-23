import { LinkIcon } from "@/imagecomponents";
import React from "react";

function CPtableListWorkExp({
  left,
  title,
  location,
  list,
  link,
}: {
  left?: string;
  title?: string;
  location?: string;
  list?: string[];
  link?: string;
}) {
  return (
    <div className=" flex gap-2">
      <p className="w-[180] text-[#64748B] text-sm">{left}</p>
      <div className="flex-1">
        <h6 className="text-[#020617] text-sm mb-2 flex items-center gap-1">
          <span>{title}</span>
          {link && (
            <a href={link} target="_blank">
              {" "}
              <LinkIcon />{" "}
            </a>
          )}
        </h6>
        <p className="text-[#64748B] text-xs mb-3.5">{location}</p>

        <ul className="list-disc">
          {list?.map((item, i) => {
            return (
              <li key={i} className="text-[#64748B] text-sm mb-3">
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CPtableListWorkExp;
