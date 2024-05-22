import FormProduct from "@/components/Fragments/FormProduct";

export default function CreateProduct() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <h1>Create Product</h1>
      </div>
      <FormProduct />
    </div>
  );
}
