export default function Info() {
  return (
    <footer className="border-t-2 border-[#efe6d2] bg-white py-8 text-night/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 text-center text-sm">
        <p>
          Энэхүү тест нь оношилгоо биш, зөвхөн өөрийгөө ажиглахад туслах хэрэгсэл
          юм. Санаа зовох зүйл байвал сургуулийнхаа сэтгэл зүйчид хандаарай.
        </p>
        <p>
          Хүүхдийн тусламжийн утас:{" "}
          <span className="font-black text-coral">108</span>
        </p>
        <p className="pt-2">
          Хөвсгөл аймаг ·{" "}
          <span className="font-bold text-night">BR Coding</span> · 2025 он
        </p>
      </div>
    </footer>
  );
}
