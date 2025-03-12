import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { read, writeFile } from "xlsx";


export interface MasteredPropsUse {
  id: number;
  source: string;
  translation: string;
  isLearningNow: boolean;
  isMastered?: boolean
}


export interface MasteredGptUse {

  source: string;
  translation: string;

}



export const getAllMastered = createAsyncThunk('alltext/getAllMastered', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/UserVocabulary/GetAllMasteredByUserId`);
    return response.data.data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});






export const masteredisfetch = createAsyncThunk(
  "home/masteredisfetch",
  async (params: { ids: number[] }, { rejectWithValue }) => {
    const { ids } = params;
    const idsGenerate = ids.map(id => `ids=${id}`).join("&");
    try {
      const response = await axiosInstance.get(
        `/UserVocabulary/ExportToExcel?${idsGenerate}`, {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          }
      }
      );
      const byteArray = new Uint8Array(response.data)
      const workbook = read(byteArray, { type: "array" })
      writeFile(workbook, "fayl.xlsx")


      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch category data");
    }
  }
);