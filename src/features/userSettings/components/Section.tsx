import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export const Section = ({ title, children }: Props) => {
  const { t } = useTranslation();

  return (
    <section className="border-foreground/20 rounded-xl border p-4">
      <h2 className="text-primary mb-5 font-bold">{t(title)}</h2>

      {children}
    </section>
  );
};
