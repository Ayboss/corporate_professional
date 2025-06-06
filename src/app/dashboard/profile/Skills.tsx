import React, { useState } from "react";
import { SkillsSchema, TSkill, TSkillsSchema } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CPInput from "@/components/CPInput";
import CPsmallButton from "@/components/CPsmallButton";
import CPEmptyState from "@/components/CPEmptyState";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { addskills, deleteskills, getskills } from "./functions";
import { errorMessage, successMessage } from "@/utils/toastalert";
import CPpillet from "@/components/CPpillet";
import Skeleton from "react-loading-skeleton";

function Skills() {
  const { data = [], isLoading } = useSWR("/skill/", getskills);
  const [addSkills, setAddSkills] = useState(false);
  return (
    <div>
      <div className="flex justify-between mb-9 ">
        <h3 className="font-medium text-lg">Skills</h3>
        {!addSkills && (
          <button
            className="text-[#050505] text-sm font-medium px-3 py-2 rounded-lg bg-[#F8FAFC] "
            onClick={() => setAddSkills(true)}
          >
            Add Skills
          </button>
        )}
      </div>
      {addSkills ? (
        <AddNewSkills setAddSkills={setAddSkills} />
      ) : isLoading ? (
        <SkillSkeleton />
      ) : (
        <ListContact setAddSkills={setAddSkills} skills={data} />
      )}
    </div>
  );
}

const ListContact = ({
  setAddSkills,
  skills = [],
}: {
  setAddSkills: React.Dispatch<React.SetStateAction<boolean>>;
  skills?: TSkill[];
}) => {
  const { trigger } = useSWRMutation(`/skill/`, deleteskills);
  const handleDelete = async (id: number) => {
    // trigger modal
    try {
      await trigger({ id: id });
      successMessage("Skill deleted successfully");
    } catch (err) {
      errorMessage(err);
    }
  };

  if (skills.length == 0) {
    return (
      <CPEmptyState
        textIcon={"💡"}
        btnText="Add a skill you have"
        action={() => setAddSkills(true)}
      />
    );
  }
  return (
    <>
      <div className="flex gap-3 flex-wrap ">
        {skills.map((skill) => (
          <CPpillet
            key={skill.id}
            name={skill.name}
            action={() => handleDelete(skill.id)}
          />
        ))}
      </div>
    </>
  );
};
function AddNewSkills({
  setAddSkills,
}: {
  setAddSkills: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { trigger, isMutating } = useSWRMutation("skill/post", addskills);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TSkillsSchema>({
    resolver: zodResolver(SkillsSchema),
  });
  const onClick = async (data: TSkillsSchema) => {
    try {
      await trigger(data);
      successMessage("Skill uploadded succesfully");
      reset();
    } catch (err) {
      errorMessage(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onClick)}>
      <div className="mb-5">
        <label className="text-[#475569] text-sm mb-2">
          Skills (maximum 15)
        </label>
        <CPInput
          className="block bg-[#F8FAFC] w-full p-4"
          placeholder="Add skills"
          error={errors.skill?.message}
          {...register("skill")}
        />
        <p className="text-xs text-[#64748B]">
          <span className="text-slate">Suggested:</span> UI/UX Design,
          Wireframing & Prototyping, Design Systems, Interaction Design, Visual
          Design
        </p>
      </div>

      <div className="flex justify-end gap-2 mt-12">
        <button onClick={() => setAddSkills(false)} className="p-3">
          Back
        </button>
        <CPsmallButton type="submit" text="Save" loading={isMutating} />
      </div>
    </form>
  );
}

function SkillSkeleton() {
  return (
    <div className="flex gap-3 flex-wrap">
      <Skeleton width={80} height={30} style={{ borderRadius: "1000px" }} />
      <Skeleton width={80} height={30} style={{ borderRadius: "1000px" }} />
      <Skeleton width={80} height={30} style={{ borderRadius: "1000px" }} />
      <Skeleton width={80} height={30} style={{ borderRadius: "1000px" }} />
      <Skeleton width={80} height={30} style={{ borderRadius: "1000px" }} />
      <Skeleton width={80} height={30} style={{ borderRadius: "1000px" }} />
      <Skeleton width={80} height={30} style={{ borderRadius: "1000px" }} />
      <Skeleton width={80} height={30} style={{ borderRadius: "1000px" }} />
    </div>
  );
}

export default Skills;
