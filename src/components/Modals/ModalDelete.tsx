import { closeModal } from "@/lib/redux/features/modals/modalDelete";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function ModalDelete({
  modalState,
  handleConfirm,
}: {
  modalState: { isOpen: boolean; slug: string };
  handleConfirm: (slug: string) => void;
}) {
  const dispatch = useAppDispatch();
  const { isOpen, slug } = modalState;

  const onConfirm = () => {
    handleConfirm(slug);
    dispatch(closeModal());
  };
  return (
    <div
      className={`fixed h-full w-full flex items-center justify-center top-0 left-0 bottom-0 bg-black bg-opacity-50 z-50 transition duration-300 ${
        isOpen ? "opacity-100 " : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`backdrop-blur-sm rounded-xl overflow-hidden transition duration-500 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-white bg-opacity-70 px-6 py-3 min-w-[300px]">
          <h2 className="text-xl font-bold text-gray-900">Delete data</h2>
        </div>
        <div className="bg-gray-300 bg-opacity-70 px-5 py-10">
          <p className="text-gray-900 text-lg text-center font-semibold">
            Are you sure ?
          </p>
        </div>
        <div className="bg-gray-300 bg-opacity-70 px-5 py-3 flex gap-2 justify-end ">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-xl"
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
