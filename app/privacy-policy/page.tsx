import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "គោលការណ៍ឯកជនភាព — JASMINTOPUP",
  description:
    "គោលការណ៍ឯកជនភាពរបស់ JASMINTOPUP ពន្យល់ពីរបៀបប្រមូល ប្រើប្រាស់ និងការពារព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក។",
};

const LAST_UPDATED = "១៥ ឧសភា ២០២៦";

const sections = [
  {
    id: "s1",
    num: "១",
    title: "សេចក្តីផ្តើម",
    content: (
      <p>
        JASMINTOPUP (<a href="https://jasmin2.onrender.com" className="text-pink-600 hover:underline font-semibold">jasmin2.onrender.com</a>)
        គឺជា platform សម្រាប់បញ្ចូល diamonds, coins, Robux និង game credits ផ្សេងៗ
        ស្ថិតនៅក្នុងប្រទេសកម្ពុជា។ គោលការណ៍ឯកជនភាពនេះ ពន្យល់ពីរបៀបដែលយើង
        ប្រមូល រក្សា ប្រើប្រាស់ និងការពារព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក នៅពេល
        អ្នកចូលទស្សនា ឬប្រើប្រាស់សេវាកម្មរបស់យើង។ យើងប្តេជ្ញាគោរព
        ភាពឯកជនរបស់អ្នកគ្រប់ពេល។
      </p>
    ),
  },
  {
    id: "s2",
    num: "២",
    title: "ការយល់ព្រម",
    content: (
      <>
        <p>
          តាមរយៈការចូលទស្សនា ឬប្រើប្រាស់ website របស់យើង អ្នកយល់ព្រមថា
          បានអាន យល់ ហើយព្រមទទួលគោលការណ៍ឯកជនភាពនេះ។
        </p>
        <div className="mt-3 rounded-xl border-l-4 border-pink-400 bg-pink-50 px-4 py-3 text-sm text-pink-800">
          ប្រសិនបើអ្នក <strong>មិនយល់ព្រម</strong> នឹងគោលការណ៍នេះ
          សូមមេត្តាបញ្ឈប់ការប្រើប្រាស់ website ហើយកុំបញ្ជូនព័ត៌មានផ្ទាល់ខ្លួន
          ណាមួយមកកាន់យើង។
        </div>
      </>
    ),
  },
  {
    id: "s3",
    num: "៣",
    title: "ព័ត៌មានដែលយើងប្រមូល",
    content: (
      <>
        <p className="font-semibold text-pink-800 mb-2">ក. ព័ត៌មានដែលអ្នកផ្ដល់ដោយផ្ទាល់</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-pink-100">
                <th className="text-left px-4 py-2 text-pink-900 font-semibold rounded-tl-lg">ប្រភេទព័ត៌មាន</th>
                <th className="text-left px-4 py-2 text-pink-900 font-semibold rounded-tr-lg">ឧទាហរណ៍</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100">
              {[
                ["ព័ត៌មានទំនាក់ទំនង", "ឈ្មោះ, អ៊ីមែល, លេខទូរស័ព្ទ"],
                ["ព័ត៌មានគណនី Game", "Game UID, Server ID, Player Name"],
                ["ព័ត៌មានការបញ្ជាទិញ", "Order ID, ចំនួន, ប្រភេទ package"],
                ["ព័ត៌មានការបង់ប្រាក់", "Payment proof, Transaction ID, KHQR reference"],
                ["សារ Support", "សំណួរ, ពាក្យបណ្តឹង, ការសន្ទនាជំនួយ"],
              ].map(([type, example]) => (
                <tr key={type} className="hover:bg-pink-50">
                  <td className="px-4 py-2 text-pink-700 font-medium">{type}</td>
                  <td className="px-4 py-2 text-pink-600">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-semibold text-pink-800 mb-2">ខ. ព័ត៌មានដែលប្រមូលដោយស្វ័យប្រវត្តិ</p>
        <ul className="list-disc list-inside space-y-1 text-pink-700 text-sm">
          <li>IP address និងទីតាំងប្រហាក់ប្រហែល</li>
          <li>ប្រភេទ browser, ប្រព័ន្ធប្រតិបត្តិការ, និងឧបករណ៍</li>
          <li>ព័ត៌មាន cookies និង session</li>
          <li>ទំព័រដែលបានចូលមើល និងពេលវេលានៃការទស្សនា</li>
        </ul>
      </>
    ),
  },
  {
    id: "s4",
    num: "៤",
    title: "របៀបដែលយើងប្រើព័ត៌មាន",
    content: (
      <>
        <p className="mb-2">ព័ត៌មានរបស់អ្នកត្រូវបានប្រើប្រាស់ក្នុងគោលបំណងខាងក្រោម:</p>
        <ul className="list-disc list-inside space-y-1.5 text-pink-700 text-sm">
          <li>ដំណើរការ និងបញ្ចប់ការបញ្ជាទិញ top-up របស់អ្នក</li>
          <li>ផ្ទៀងផ្ទាត់ការបង់ប្រាក់ និងបញ្ជាក់ transaction</li>
          <li>ផ្ញើការជូនដំណឹង order status ទៅអ្នក</li>
          <li>ផ្ដល់ customer support និងដោះស្រាយបញ្ហា</li>
          <li>ការពារការក្លែងបន្លំ (fraud) និងសកម្មភាពមិនស្របច្បាប់</li>
          <li>វិភាគ និងកែលម្អប្រសិទ្ធភាព website</li>
          <li>ទំនាក់ទំនងពី promotions ឬការផ្លាស់ប្ដូរ (ប្រសិនបើអ្នកបានព្រម)</li>
        </ul>
      </>
    ),
  },
  {
    id: "s5",
    num: "៥",
    title: "ព័ត៌មានការបង់ប្រាក់ និងការបញ្ជាទិញ",
    content: (
      <>
        <p className="mb-3">
          ការទូទាត់នៅ JASMINTOPUP ដំណើរការតាម <strong className="text-pink-700">KHQR</strong>{" "}
          ដែលជាវិធីបង់ប្រាក់ស្ដង់ដាររបស់ប្រទេសកម្ពុជា។ យើងទទួលបានតែ
          Transaction Reference ID និងរូបភាព payment proof ប៉ុណ្ណោះ
          ដើម្បីផ្ទៀងផ្ទាត់ការបង់ប្រាក់។
        </p>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-bold mb-2">⚠️ យើងមិនដែល និងនឹងមិនស្នើសុំ:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Password ឬ PIN នៃ game account របស់អ្នក</li>
            <li>OTP ពី SMS ធនាគារ ឬ e-wallet</li>
            <li>Password ឬ PIN ការបង់ប្រាក់របស់អ្នក</li>
            <li>ការចូលដោយផ្ទាល់ទៅក្នុង account ណាមួយ</li>
          </ul>
          <p className="mt-2 font-semibold">
            ប្រសិនបើអ្នកទទួលបានសំណើបែបនេះ សូមកុំឆ្លើយតប
            ហើយទំនាក់ទំនងយើងភ្លាមៗ។
          </p>
        </div>
      </>
    ),
  },
  {
    id: "s6",
    num: "៦",
    title: "Log Files",
    content: (
      <p>
        ដូច website ភាគច្រើន JASMINTOPUP ប្រើប្រាស់ log files ស្វ័យប្រវត្តិ
        ដែលរួមមាន IP address, ប្រភេទ browser, Internet Service Provider (ISP),
        កាលបរិច្ឆេទ និងពេលវេលា, ទំព័រ referral និង exit។
        Log ទាំងនេះត្រូវបានប្រើដើម្បីវិភាគ trend, គ្រប់គ្រង website,
        និងប្រមូលស្ថិតិប្រជាសាស្ត្ររួម។
        ព័ត៌មាន log <strong>មិនអាចកំណត់អត្តសញ្ញាណបុគ្គល</strong>ដោយផ្ទាល់ទេ។
      </p>
    ),
  },
  {
    id: "s7",
    num: "៧",
    title: "Cookies",
    content: (
      <>
        <p className="mb-2">
          Cookies គឺជាឯកសារតូចៗដែលរក្សាទុកនៅក្នុង browser ដើម្បីធ្វើឱ្យ
          ការប្រើប្រាស់ website កាន់តែងាយស្រួល។ យើងប្រើ cookies ក្នុងគោលបំណង:
        </p>
        <ul className="list-disc list-inside space-y-1 text-pink-700 text-sm mb-3">
          <li>រក្សាទុក preference ភាសា និងរូបិយប័ណ្ណ (USD/KHR)</li>
          <li>ការពារ session security</li>
          <li>វិភាគចំនួនអ្នកចូលមើល និងទំព័រពេញនិយម</li>
        </ul>
        <p className="text-sm text-pink-600">
          អ្នកអាចបិទ cookies នៅក្នុង browser settings ប៉ុន្តែអាចប៉ះពាល់
          ដល់មុខងារខ្លះនៃ website។
        </p>
      </>
    ),
  },
  {
    id: "s8",
    num: "៨",
    title: "សេវាកម្មភាគីទីបី",
    content: (
      <>
        <p className="mb-3">
          ព័ត៌មានរបស់អ្នក <strong className="text-pink-700">នឹងមិនត្រូវបានលក់ ជួល ឬចែករំលែក</strong>{" "}
          ជាមួយភាគីទីបី លើកលែងតែករណីចាំបាច់ខាងក្រោម:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-pink-100">
                <th className="text-left px-4 py-2 text-pink-900 font-semibold rounded-tl-lg">ភាគីទីបី</th>
                <th className="text-left px-4 py-2 text-pink-900 font-semibold rounded-tr-lg">ហេតុផល</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100">
              {[
                ["Payment Provider (KHQR)", "ផ្ទៀងផ្ទាត់ transaction"],
                ["Top-up Supplier / Game Publisher", "ដំណើរការ UID និង top-up"],
                ["Hosting Provider (Render.com)", "ប្រើប្រាស់ server infrastructure"],
                ["Analytics Tools", "ស្ថិតិ website (anonymous)"],
                ["អាជ្ញាធរតាមច្បាប់", "ករណីចាំបាច់ស្របច្បាប់"],
              ].map(([party, reason]) => (
                <tr key={party} className="hover:bg-pink-50">
                  <td className="px-4 py-2 text-pink-700 font-medium">{party}</td>
                  <td className="px-4 py-2 text-pink-600">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-pink-600">
          ភាគីទីបីទាំងនេះមានកាតព្វកិច្ចការពារទិន្នន័យ
          ហើយមិនអនុញ្ញាតឱ្យប្រើព័ត៌មានផ្ទាល់ខ្លួនសម្រាប់គោលបំណងផ្ទាល់ខ្លួន
          របស់ពួកគេទេ។
        </p>
      </>
    ),
  },
  {
    id: "s9",
    num: "៩",
    title: "សុវត្ថិភាពទិន្នន័យ",
    content: (
      <>
        <p className="mb-2">
          យើងប្រើវិធានការសុវត្ថិភាពស្ដង់ដារ ដើម្បីការពារព័ត៌មានរបស់អ្នក:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-pink-700 text-sm mb-3">
          <li>ការតភ្ជាប់ HTTPS ដើម្បីការពារទិន្នន័យក្នុងការបញ្ជូន</li>
          <li>ការដាក់កំហិតការចូល database ជាមួយ role-based access</li>
          <li>ការ hash ព័ត៌មានសម្ងាត់</li>
          <li>ការត្រួតពិនិត្យ log សម្រាប់សកម្មភាពគួរឱ្យសង្ស័យ</li>
        </ul>
        <div className="rounded-xl border-l-4 border-pink-400 bg-pink-50 px-4 py-3 text-sm text-pink-800">
          ទោះបីយ៉ាងណា <strong>គ្មាន system ណាដែលសុវត្ថិភាព ១០០%</strong> ទេ។
          យើងណែនាំឱ្យអ្នកជួយការពារខ្លួន ដោយមិនចែករំលែក password
          ចំពោះបុគ្គលណាក៏ដោយ។
        </div>
      </>
    ),
  },
  {
    id: "s10",
    num: "១០",
    title: "រយៈពេលរក្សាទុកទិន្នន័យ",
    content: (
      <>
        <p className="mb-2">យើងរក្សាទុកព័ត៌មានរបស់អ្នកតែក្នុងរយៈពេលចាំបាច់ប៉ុណ្ណោះ:</p>
        <ul className="list-disc list-inside space-y-1.5 text-pink-700 text-sm mb-3">
          <li><strong>ព័ត៌មាន order:</strong> រក្សា ១ ឆ្នាំ ដើម្បីសម្រួល dispute resolution</li>
          <li><strong>Log files:</strong> រក្សា ៩០ ថ្ងៃ</li>
          <li><strong>សារ support:</strong> រក្សា ១ ឆ្នាំ</li>
          <li><strong>Payment proof:</strong> រក្សា ១ ឆ្នាំ ដើម្បី audit</li>
        </ul>
        <p className="text-sm text-pink-600">
          នៅពេលផុតរយៈពេល ទិន្នន័យនឹងត្រូវបានលុបចោល ឬធ្វើ anonymize
          ដើម្បីកុំអាចកំណត់អត្តសញ្ញាណបាន។
        </p>
      </>
    ),
  },
  {
    id: "s11",
    num: "១១",
    title: "សិទ្ធិរបស់អ្នកប្រើប្រាស់",
    content: (
      <>
        <p className="mb-2">អ្នកមានសិទ្ធិទាំងនេះ ទាក់ទងនឹងព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក:</p>
        <ul className="list-disc list-inside space-y-1.5 text-pink-700 text-sm mb-3">
          <li><strong>សិទ្ធិចូលមើល:</strong> ស្នើសុំច្បាប់ចម្លងនៃព័ត៌មានដែលយើងមានអំពីអ្នក</li>
          <li><strong>សិទ្ធិកែតម្រូវ:</strong> ស្នើឱ្យកែព័ត៌មានដែលមិនត្រឹមត្រូវ</li>
          <li><strong>សិទ្ធិលុបចោល:</strong> ស្នើឱ្យលុបទិន្នន័យ (ស្ថានភាពមួយចំនួន)</li>
          <li><strong>សិទ្ធិបដិសេធ:</strong> ប្រឆាំងការប្រើព័ត៌មានសម្រាប់ marketing</li>
        </ul>
        <p className="text-sm text-pink-600">
          ដើម្បីប្រើប្រាស់សិទ្ធិទាំងនេះ សូមទំនាក់ទំនងយើងតាម{" "}
          <a href="mailto:jasmintopup@gmail.com" className="text-pink-700 font-semibold hover:underline">
            jasmintopup@gmail.com
          </a>{" "}
          ហើយយើងនឹងឆ្លើយតបក្នុងរយៈ <strong>៧ ថ្ងៃ</strong>។
        </p>
      </>
    ),
  },
  {
    id: "s12",
    num: "១២",
    title: "ឯកជនភាពកុមារ",
    content: (
      <>
        <p className="mb-2">
          JASMINTOPUP <strong className="text-pink-700">មិនមែនសម្រាប់</strong>
          អ្នកដែលមានអាយុក្រោម ១៨ ឆ្នាំទេ។ យើងមិនដឹងខ្លួន ឬចេតនា
          ប្រមូលព័ត៌មានផ្ទាល់ខ្លួនពីអ្នកមានអាយុក្រោម ១៨ ឆ្នាំឡើយ។
        </p>
        <p className="text-sm text-pink-600">
          ប្រសិនបើអ្នកជាឪពុកម្តាយ ឬអាណាព្យាបាល ហើយដឹងថាកូនអ្នក
          បានផ្ដល់ព័ត៌មានផ្ទាល់ខ្លួន សូមទំនាក់ទំនងយើង
          ដើម្បីឱ្យយើងអាចលុបព័ត៌មាននោះចេញ។
        </p>
      </>
    ),
  },
  {
    id: "s13",
    num: "១៣",
    title: "ការផ្លាស់ប្ដូរ Privacy Policy",
    content: (
      <>
        <p className="mb-2">
          យើងរក្សាសិទ្ធិក្នុងការធ្វើបច្ចុប្បន្នភាពគោលការណ៍ឯកជនភាពនេះ
          នៅពេលណាមួយ។ ការផ្លាស់ប្ដូរសំខាន់ៗ នឹងត្រូវបានជូនដំណឹងតាម:
        </p>
        <ul className="list-disc list-inside space-y-1 text-pink-700 text-sm mb-2">
          <li>ការបង្ហាញ banner ជូនដំណឹងនៅ website</li>
          <li>ការផ្លាស់ប្ដូរ កែប្រែចុងក្រោយ date នៅផ្នែកខាងលើ</li>
        </ul>
        <p className="text-sm text-pink-600">
          ការបន្តប្រើ website ក្រោយការផ្លាស់ប្ដូរ ចាត់ទុកថាអ្នកយល់ព្រម
          នឹងគោលការណ៍ដែលបានធ្វើបច្ចុប្បន្នភាព។
        </p>
      </>
    ),
  },
  {
    id: "s14",
    num: "១៤",
    title: "ទំនាក់ទំនង",
    content: (
      <>
        <p className="mb-4">
          ប្រសិនបើអ្នកមានសំណួរ ឬបញ្ហាទាក់ទងនឹងគោលការណ៍ឯកជនភាពនេះ
          សូមទំនាក់ទំនងយើង:
        </p>
        <div className="rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white p-5 space-y-3">
          {[
            { icon: <img src="https://i.ibb.co/ycPxxz8h/IMG-20260515-100429.png" alt="" className="h-5 w-5 object-contain" />, label: "JASMINTOPUP" },
            { icon: <img src="https://i.ibb.co/0px31m4Q/1000073671-removebg-preview.png" alt="" className="h-5 w-5 object-contain" />, label: <a href="https://jasmin2.onrender.com" className="text-pink-700 hover:underline font-medium">jasmin2.onrender.com</a> },
            { icon: <img src="https://i.ibb.co/cSjgfRKB/IMG-20260515-113326.png" alt="" className="h-5 w-5 object-contain" />, label: <a href="mailto:jasmintopup@gmail.com" className="text-pink-700 hover:underline font-medium">jasmintopup@gmail.com</a> },
            { icon: <img src="https://i.ibb.co/8Lx3whbn/1000073661-removebg-preview.png" alt="" className="h-5 w-5 object-contain" />, label: "ប្រទេសកម្ពុជា" },
          ].map(({ icon, label }, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-100 text-base shrink-0">{icon}</span>
              <span className="text-pink-700">{label}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <div
        className="relative overflow-hidden py-14 px-4 text-center"
        style={{ background: "linear-gradient(135deg,#e91e8c 0%,#ff6eb4 60%,#ffb3d9 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%,rgba(255,255,255,.18) 0%,transparent 60%)," +
              "radial-gradient(ellipse at 80% 20%,rgba(255,255,255,.12) 0%,transparent 50%)",
          }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 mb-4">
            <img src="https://i.ibb.co/vxB50Vwr/IMG-20260515-114538.png" alt="JASMINTOPUP" className="h-10 w-10 rounded-full object-cover border-2 border-white/60" />
            <span className="font-display text-xl font-bold text-white tracking-wide">JASMINTOPUP</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-2 drop-shadow">
            គោលការណ៍ឯកជនភាព
          </h1>
          <p className="text-white/80 text-sm">Privacy Policy</p>
          <span className="mt-4 inline-block rounded-full border border-white/40 bg-white/20 px-4 py-1 text-xs text-white">
            កែប្រែចុងក្រោយ: {LAST_UPDATED}
          </span>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

        {/* TOC */}
        <div className="mb-8 rounded-2xl border-2 border-pink-200 bg-white p-6">
          <p className="text-xs uppercase tracking-widest text-pink-500 font-extrabold mb-3">មាតិកា</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-6 text-sm list-decimal list-inside">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-pink-700 hover:text-pink-500 hover:underline transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="rounded-2xl border-2 border-pink-200 bg-white p-6 scroll-mt-6 transition-all duration-300 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-300/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-extrabold text-white text-sm shadow-md shadow-pink-300/40"
                  style={{ background: "linear-gradient(135deg,#e91e8c,#ff6eb4)" }}
                >
                  {s.num}
                </div>
                <h2 className="font-display text-lg font-extrabold text-pink-800">{s.title}</h2>
              </div>
              <div className="text-pink-700 leading-relaxed text-[15px]">{s.content}</div>
            </div>
          ))}
        </div>

        {/* Back to top */}
        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-pink-300/40 transition hover:bg-pink-700 hover:-translate-y-0.5"
          >
            ត្រឡប់ទៅខាងលើ
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}