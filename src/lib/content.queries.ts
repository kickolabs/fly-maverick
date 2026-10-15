import { queryOptions } from "@tanstack/react-query";
import { getDestinationPage, getPackagePage, listDestinations, listPackages } from "./content.functions";

export const destinationsQuery = queryOptions({ queryKey: ["public", "destinations"], queryFn: () => listDestinations() });
export const packagesQuery = queryOptions({ queryKey: ["public", "packages"], queryFn: () => listPackages() });
export const destinationPageQuery = (slug: string) =>
  queryOptions({ queryKey: ["public", "destination", slug], queryFn: () => getDestinationPage({ data: slug }) });
export const packagePageQuery = (slug: string) =>
  queryOptions({ queryKey: ["public", "package", slug], queryFn: () => getPackagePage({ data: slug }) });
