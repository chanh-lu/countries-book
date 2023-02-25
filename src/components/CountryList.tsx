import { useEffect, useState } from "react";
import { Country } from "../types/Country";
import { ICountryController } from "../api/ICountryController";

export function CountryList({
  controller,
}: {
  controller: ICountryController;
}) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    (async () => {
      let data: Country[] = JSON.parse(
        sessionStorage.getItem("countries") ?? "[]"
      );

      if (!data || data.length === 0) {
        data = await controller.getAllAsync();
        sessionStorage.setItem("countries", JSON.stringify(data));
        console.info("Fetched data from API");
      }

      setCountries(data);
    })();
  }, [controller]);

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.officialName}>{country.name}</li>
      ))}
    </ul>
  );
}