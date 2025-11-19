import { Helmet } from "react-helmet-async";

type StructuredDataProps = {
  data: Record<string, any> | Array<Record<string, any>>;
};

export function StructuredData({ data }: StructuredDataProps) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <Helmet>
      {json.map((item, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}

export default StructuredData;