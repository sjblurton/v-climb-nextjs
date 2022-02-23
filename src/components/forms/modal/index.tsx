import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { useAlert } from "react-alert";
import { KeyedMutator } from "swr";
import {
  BrandWithStringDates,
  DeleteByID,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../../../interface";
import { axiosDelete } from "../../../service/axios";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: DeleteByID;
  mutate:
    | KeyedMutator<{
        brands: BrandWithStringDates[];
      }>
    | KeyedMutator<{
        rubbers: RubberWithStringDates[];
      }>
    | KeyedMutator<{
        shoes: ShoeWithStringDates[];
      }>;
}

export const DeleteModal = ({ isOpen, setIsOpen, data, mutate }: Props) => {
  const alert = useAlert();
  const [isDisabled, setIsDisabled] = useState(false);

  const handelDelete = async (id: string) => {
    setIsDisabled(true);
    if (data.type === "BRAND") {
      const res = await axiosDelete.deleteBrand(id);
      setIsDisabled(false);
      setIsOpen(false);
      mutate();
      if (res.brandName) {
        alert.show(`${res.brandName} has been delete.`, { type: "success" });
      }
      if (res.error) {
        alert.show(`${res.error.brand} had been delete.`, { type: "error" });
      }
    }
    if (data.type === "RUBBER") {
      const res = await axiosDelete.deleteRubber(id);
      setIsDisabled(false);
      setIsOpen(false);
      mutate();
      if (res.rubber) {
        alert.show(`${res.rubber} has been delete.`, {
          type: "success",
        });
      }
      if (res.error) {
        alert.show(`${res.error.rubber} had been delete.`, {
          type: "error",
        });
      }
    }
    if (data.type === "SHOE") {
      const res = data.slug
        ? await axiosDelete.deleteShoe(data.slug)
        : { error: { shoes: `Ops... something went wrong.` } };
      setIsDisabled(false);
      setIsOpen(false);
      mutate();
      if (res.shoes) {
        alert.show(`${res.shoes} has been delete.`, {
          type: "success",
        });
      }
      if (res.error) {
        alert.show(`${res.error.shoes} had been delete.`, {
          type: "error",
        });
      }
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Permanently Delete
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to Permanently delete {data.name}?
                </p>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className={
                    isDisabled ? "btn-danger disabled-btn" : "btn-danger"
                  }
                  disabled={isDisabled}
                  onClick={() => handelDelete(data.id)}
                >
                  DELETE!
                </button>
                <button
                  type="button"
                  className="btn-olive"
                  onClick={() => setIsOpen(false)}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
