import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactSchema, TContact, TContactSchema } from "./type";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { CPEmptyState, CPsmallButton, CPselect, CPInput } from "@/components";
import { errorMessage, successMessage } from "@/utils/toastalert";
import { addcontact, deletecontact, getContacts } from "./functions";
import Skeleton from "react-loading-skeleton";
import { LinkIcon } from "@/imagecomponents";
import Link from "next/link";
import CPdeleteModal from "@/components/CPdeleteModal";

const Contact = () => {
  const { data = [], isLoading } = useSWR("/contacts/", getContacts);

  const [addlink, setAddLink] = useState(false);
  return (
    <section>
      <div className="flex justify-between mb-9 ">
        <h3 className="font-medium text-lg">Contact</h3>
        {!addlink && (
          <button
            className="text-[#050505] text-sm font-medium px-3 py-2 rounded-lg bg-[#F8FAFC]"
            onClick={() => {
              setAddLink(true);
            }}
          >
            Add link
          </button>
        )}
      </div>
      {addlink ? (
        <AddNewContact setAddLink={setAddLink} />
      ) : isLoading ? (
        <ContactSkeleton />
      ) : (
        <ListContact setAddLink={setAddLink} contacts={data} />
      )}
    </section>
  );
};

const ListContact = ({
  setAddLink,
  contacts = [],
}: {
  setAddLink: React.Dispatch<React.SetStateAction<boolean>>;
  contacts?: TContact[];
}) => {
  if (contacts.length == 0) {
    return (
      <CPEmptyState
        textIcon={"📇"}
        btnText="Add Contact"
        action={() => setAddLink(true)}
      />
    );
  }

  return contacts.map((contact) => (
    <CPcontact key={contact.id} contact={contact} />
  ));
};

const AddNewContact = ({
  setAddLink,
}: {
  setAddLink: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
    trigger,
  } = useForm<TContactSchema>({ resolver: zodResolver(ContactSchema) });
  const { trigger: submit, isMutating } = useSWRMutation(
    "/contacts/",
    addcontact
  );
  const onClick = async () => {
    const values = getValues();
    let valid = true;
    if (values.type == "custom") {
      valid = await trigger(["platform_name", "type", "url", "username"]);
    } else {
      valid = await trigger(["type", "url", "username"]);
    }
    if (!valid) return;
    try {
      await submit(values);
      successMessage("Contact added successfully");
      setAddLink(false);
    } catch (err) {
      errorMessage(err, "Contact creation failed");
    }
  };
  return (
    <div>
      <div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="mb-2 text-sm text-[#475569]">Type</label>
            <CPselect
              items={[
                { text: "Linkedin", val: "linkedin" },
                { text: "X", val: "X" },
                { text: "Email", val: "email" },
                { text: "Custom", val: "custom" },
              ]}
              onChange={(val: string) => setValue("type", val)}
              value={watch("type")}
              error={errors.type?.message}
            />
          </div>
          <div className="flex-1">
            <label className="mb-2 text-sm text-[#475569]">Username</label>
            <CPInput
              placeholder="username"
              error={errors.username?.message}
              {...register("username")}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {watch("type") == "custom" && (
          <div className="flex-1">
            <label className="mb-2 text-sm text-[#475569]">Platform_type</label>
            <CPInput
              placeholder="Linkdin"
              {...register("platform_name")}
              error={errors.platform_name?.message}
            />
          </div>
        )}

        <div className="flex-1">
          <label className="mb-2 text-sm text-[#475569]">URL</label>
          <CPInput
            placeholder="https://linkedin.com/wade"
            {...register("url")}
            error={errors.url?.message}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-12">
        <button onClick={() => setAddLink(false)} className="p-3">
          Back
        </button>
        <CPsmallButton
          type="submit"
          text="Save"
          loading={isMutating}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

const CPcontact = ({ contact }: { contact: TContact }) => {
  const { trigger, isMutating } = useSWRMutation(
    `/contacts/${contact.id}`,
    deletecontact
  );
  const [deletemodal, setdeletemodal] = useState(false);
  const handleDelete = async () => {
    // trigger modal
    try {
      await trigger({ id: contact.id });
      successMessage("contact deleted successfully");
      setdeletemodal(false);
    } catch (err) {
      errorMessage(err);
    }
  };

  return (
    <div key={contact.id} className="flex mb-8 gap-0.5">
      <div className="w-[180] max-sm:w-[100]">{contact.platform_name}</div>
      <div className="flex-1">
        <div className="flex">
          <p className="text-sm mb-4">{contact.username}</p>
          <Link target="_blank" href={contact.url}>
            <LinkIcon />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {/* <button className="text-xs text-[#64748B]">Edit</button> */}
          <button
            className="text-xs text-[#64748B] cursor-pointer"
            onClick={() => setdeletemodal(true)}
          >
            Delete
          </button>
        </div>
      </div>
      {deletemodal && (
        <CPdeleteModal
          onClose={() => setdeletemodal(false)}
          onDelete={handleDelete}
          isLoading={isMutating}
        />
      )}
    </div>
  );
};

const ContactSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <CPContactSkeleton />
      <CPContactSkeleton />
      <CPContactSkeleton />
    </div>
  );
};

const CPContactSkeleton = () => {
  return (
    <div className="flex items-start gap-x-20">
      <Skeleton width={50} />
      <div className="flex-1 ">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};

export default Contact;
