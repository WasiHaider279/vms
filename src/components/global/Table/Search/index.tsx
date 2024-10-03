import { useForm } from "react-hook-form";
import Input from "../../Input";
import { useQueryString } from "@/hooks/useQueryString";

const Search = () => {
  const { register } = useForm();
  const queryString = useQueryString();

  const handleSearch = (event: any) => {
    queryString.setQuery({ name: "search", value: event.target.value });
  };

  return (
    <div className="py-1">
      <label
        htmlFor="search"
        className="block pl-3 pr-4 text-sm font-medium text-gray-700"
      >
        Search
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          id="search"
          name="search"
          className="form-input py-2 px-3 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          placeholder="Enter text..."
        />
      </div>
    </div>
  );
};

export default Search;
