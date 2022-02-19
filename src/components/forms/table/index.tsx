import React, { Dispatch, SetStateAction } from "react";
import { deleteById } from "../../../helper/helper";
import { DeleteByID } from "../../../interface";

type Data = { id: string; name: string };

interface Props {
  name: string;
  type: "BRAND" | "RUBBER" | "SHOE";
  data: Data[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<DeleteByID>>;
}

export const Table = ({ name, type, data, setIsOpen, setData }: Props) => {
  return (
    <table className="table-auto my-4 text-olive-50 w-full">
      <thead>
        <tr>
          <th>{name}</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const data: DeleteByID = {
            id: item.id,
            name: item.name,
            type: type,
          };
          return (
            <tr key={item.id}>
              <td className="capitalize">{item.name}</td>
              <td>
                <button className="btn-olive">edit</button>
              </td>
              <td>
                <button
                  onClick={(e) => deleteById(e, data, setIsOpen, setData)}
                  className="btn-danger"
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
