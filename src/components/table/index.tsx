import Image from "next/image";
import React from "react";
import { RubberWithBrandName } from "../../pages/guide";

type Props = { rubbers: RubberWithBrandName[] };

export const RubberTable = ({ rubbers }: Props) => {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-olive-800 text-left text-xs font-semibold text-slate-100 uppercase tracking-wider">
            Manufacturer
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-olive-800 text-left text-xs font-semibold text-slate-100 uppercase tracking-wider">
            Model
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-olive-800 text-left text-xs font-semibold text-slate-100 uppercase tracking-wider hidden sx:table-cell">
            Stiffness
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-olive-800 text-left text-xs font-semibold text-slate-100 uppercase tracking-wider hidden sm:table-cell">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {rubbers.map((rubber) => (
          <tr key={rubber.id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-olive-800 text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 hidden sxx:table-cell">
                  <Image
                    className="w-full h-full rounded-full"
                    src={rubber.image}
                    alt={`climbing shoe rubber logo for ${rubber.brand}'s ${rubber.name}`}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-slate-50 whitespace-no-wrap">
                    {rubber.brand}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-olive-800 text-sm">
              <p className="text-slate-50 whitespace-no-wrap">{rubber.name}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-olive-800 text-sm hidden sx:table-cell">
              <p className="text-slate-50 whitespace-no-wrap">
                {rubber.stiffness}
              </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-olive-800 text-sm hidden sm:table-cell">
              <p className="text-slate-50 whitespace-no-wrap">
                {rubber.description}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
