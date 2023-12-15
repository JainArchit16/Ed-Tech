import { toast } from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { catalogData } from "../apis";

//Not by me
export const getCatalogAndPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiconnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId: categoryId }
    );
    console.log("Catalog page data response", response.data);
    if (!response?.data?.success)
      throw new Error("Could not Fetch Category page data");

    result = response?.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
};
