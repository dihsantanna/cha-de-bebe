import React from "react";

export function Notes() {
  return (
    <>
      <div className="text-center italic">
        <strong className="font-semibold text-lg">Obs</strong>: <br /> Fraldas
        Descartáveis: <strong className="font-semibold">Babysec</strong>,{" "}
        <strong className="font-semibold">Pom Pom</strong>,{" "}
        <strong className="font-semibold">Pampers</strong> e{" "}
        <strong className="font-semibold">Huggies</strong>; <br />
        Pomadas: <strong className="font-semibold">Bepantol</strong> e{" "}
        <strong className="font-semibold">Babymed</strong>; <br />
        Lenços umedecidos: <strong className="font-semibold">
          Neutros
        </strong> ou <strong className="font-semibold">Aloe vera</strong>;{" "}
        <br />
      </div>
      <div className="text-center">
        <strong className="font-bold text-lg">Priorizar Cores:</strong>
        <ul className="flex">
          <li className="ml-1 w-max text-green-500 text-stroke-zinc font-bold">
            verde
          </li>
          ,
          <li className="ml-1 w-max text-amber-400 text-stroke-zinc font-bold">
            amarelo
          </li>
          ,
          <li className="ml-1 w-max text-white text-stroke-zinc font-bold">
            branco
          </li>
          ,
          <li className="mx-1 w-max text-orange-900 text-stroke-zinc font-bold">
            marrom
          </li>
          ou
          <li className="ml-1 w-max text-gray-600 text-stroke-zinc font-bold">
            cinza
          </li>
          .
        </ul>
      </div>
    </>
  );
}
