import { FetchApiService } from "@/services/api/FetchApiService";
import { IUBusiness } from "@/interfaces/IUBusiness";
import { endPoints } from "@/config/endPoints";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";

const api = new FetchApiService();

export const getBusiness = async () => {
  let business: IUBusiness = await api.get<IUBusiness>({
    url: endPoints.business.get,
  });

  return business;
};

export const updateBusiness = async (data: IUBusiness) => {
  const formData = new FormData();

  formData.append("business_name", data.business_name);
  console.log("data: logooooooooooo", data.business_logo);
  formData.append("business_logo", data.business_logo);
  formData.append("business_address", data.business_address || "");
  formData.append("business_phone_number", data.business_phone_number || "");
  formData.append("business_email", data.business_email || "");
  formData.append("business_facebook_url", data.business_facebook_url || "");
  formData.append("business_instagram_url", data.business_instagram_url || "");
  formData.append("business_x_url", data.business_x_url || "");
  formData.append(
    "business_bank_account_number_1",
    data.business_bank_account_number_1 || "",
  );
  formData.append("business_bank_name_1", data.business_bank_name_1 || "");
  formData.append(
    "business_bank_account_type_1",
    data.business_bank_account_type_1 || "",
  );
  formData.append(
    "business_bank_account_number_2",
    data.business_bank_account_number_2 || "",
  );
  formData.append("business_bank_name_2", data.business_bank_name_2 || "");
  formData.append(
    "business_bank_account_type_2",
    data.business_bank_account_type_2 || "",
  );

  let business: IUBusiness = await api.put<IUBusiness>({
    url: endPoints.business.put,
    body: formData,
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
      },
    },
  });

  return business;
};
