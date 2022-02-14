import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { DeleteEntry } from "../../service/database";
import { useAlert } from "react-alert";
import { Brand } from "@prisma/client";
import { BrandList } from "../../interface";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setBrandList: Dispatch<
    SetStateAction<{
      brands: BrandList[];
    }>
  >;
  brandList: { brands: BrandList[] };
  data: {
    id: string;
    name: string;
  };
}

export const MyDialog = ({
  isOpen,
  setIsOpen,
  data,
  setBrandList,
  brandList,
}: Props) => {
  const alert = useAlert();

  const handelDelete = async (id: string) => {
    const res: { brands: Brand[] } = await DeleteEntry.Brand(id);
    setIsOpen(false);

    if (res) {
      alert.show(`${res.brands[0].name} had been delete.`);
      const newBrandsList = brandList?.brands.filter(
        (item) => item.id !== res.brands[0].id
      );
      setBrandList({ brands: newBrandsList });
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
                  className="btn-danger"
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
