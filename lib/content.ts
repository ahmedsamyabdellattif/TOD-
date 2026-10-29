import settings from "@/content/site.json";
import serviceData from "@/content/services.json";
import audienceData from "@/content/audiences.json";
import clientData from "@/content/clients.json";
import systemData from "@/content/systems.json";
import valueData from "@/content/values.json";
import stageData from "@/content/stages.json";
import aboutData from "@/content/about.json";
import approachData from "@/content/approach.json";
import articleData from "@/content/articles.json";
import associateData from "@/content/associates.json";
export type Locale = "en" | "ar";
export type Text = { en: string; ar: string };
export const text = (en: string, ar: string): Text => ({ en, ar });
export const t = (value: Text, l: Locale) => value[l];
export const site = settings;
export const streams = serviceData.streams;
export const audiences = audienceData.items;
export const clients = clientData.items;
export const systems = systemData.items;
export const values = valueData.items;
export const stages = stageData.items;
export const about = aboutData.sections;
export const approach = approachData;
export const categories = [
  text("Leadership", "القيادة"),
  text("Organizations and human systems", "المؤسسات والأنظمة الإنسانية"),
  text(
    "Boardroom governance and dynamics",
    "حوكمة مجالس الإدارة وديناميكياتها",
  ),
  text("Organizational culture and transformation", "الثقافة المؤسسية والتحول"),
  text("Family business and succession", "الأعمال العائلية والتعاقب"),
  text("Mentoring and capability development", "الإرشاد وتطوير القدرات"),
  text(
    "Emerging organizational issues in Saudi Arabia and the region",
    "القضايا المؤسسية الناشئة في السعودية والمنطقة",
  ),
];
export type Article = {
  slug: string;
  title: Text;
  summary: Text;
  body: Text;
  date: string;
  category: number;
  author: string;
  image: string;
  imageAlt: Text;
  featured: boolean;
  published: boolean;
  related: string[];
};
export type Associate = {
  slug: string;
  name: Text;
  title: Text;
  bio: Text;
  photo: string;
  expertise: Text[];
  sectors: Text[];
  qualifications: Text[];
  languages: Text[];
  linkedin: string;
  order: number;
  published: boolean;
};
export const articles = (articleData.items as Article[])
  .filter((x) => x.published)
  .sort((a, b) => b.date.localeCompare(a.date));
export const associates = (associateData.items as Associate[])
  .filter((x) => x.published)
  .sort((a, b) => a.order - b.order);
export const pageNames: Record<string, Text> = {
  legal: text("Legal", "المعلومات القانونية"),
  "": text("Home", "الرئيسية"),
  about: text("About TOD", "عن TOD"),
  approach: text("Our Approach", "منهجنا"),
  associates: text("Associates", "خبراؤنا"),
  services: text("Services", "الخدمات"),
  "who-we-work-with": text("Who We Work With", "مع من نعمل"),
  library: text("The Development Library", "مكتبة التطوير"),
  contact: text("Contact", "تواصل معنا"),
  privacy: text("Privacy Policy", "سياسة الخصوصية"),
  terms: text("Terms of Use", "شروط الاستخدام"),
};
export const pathFor = (l: Locale, path = "") =>
  `/${l}${path ? "/" + path : ""}`;
export const cta = text("Start a Conversation", "ابدأ حوارًا");
export const intro = {
  who: text(
    "Total Organization Development (TOD) is a Saudi-based organizational consulting practice. We work with boards, leaders and organizations where performance cannot be understood through strategy, structure or process alone, and where relationships, authority, culture and unseen patterns shape what actually happens.",
    "توتال أورغنايزيشن ديفيلوبمنت (TOD) ممارسة استشارية مؤسسية مقرها المملكة العربية السعودية. نعمل مع مجالس الإدارة والقادة والمؤسسات التي لا يمكن فهم أدائها من خلال الاستراتيجية أو الهيكل أو العمليات وحدها؛ حيث تشكل العلاقات والسلطة والثقافة والأنماط غير المرئية ما يحدث فعليًا.",
  ),
  understand: text(
    "Before attempting to change a system, we seek to understand it.",
    "قبل محاولة تغيير النظام، نسعى إلى فهمه.",
  ),
  perspective: text(
    "For TOD, Human Systems is not a separate service. It is the perspective through which we understand and approach all of our work.",
    "بالنسبة إلى TOD، ليست الأنظمة الإنسانية خدمة منفصلة، بل المنظور الذي نفهم من خلاله جميع أعمالنا ونقاربها.",
  ),
  experience: text(
    "TOD and its associates have supported leaders, teams and organizations across government, national institutions and leading corporations in Saudi Arabia, the GCC and international markets.",
    "دعمت TOD وخبراؤها القادة والفرق والمؤسسات في القطاع الحكومي والمؤسسات الوطنية والشركات الرائدة في المملكة العربية السعودية ودول مجلس التعاون والأسواق الدولية.",
  ),
  audience: text(
    "We work where the challenge is as much human as it is technical. The people and organizations we work with share one thing: what they are facing cannot be solved by structure or process alone.",
    "نعمل حيث يكون التحدي إنسانيًا بقدر ما هو تقني. يجمع الأفراد والمؤسسات الذين نعمل معهم أمر واحد: لا يمكن معالجة ما يواجهونه بالهيكل أو الإجراءات وحدها.",
  ),
  associates: text(
    "TOD works through a network of consultants, coaches, mentors and specialists who share a Human Systems perspective. Each engagement brings together the people best suited to the system in question.",
    "تعمل TOD عبر شبكة من المستشارين والكوتشز والمرشدين والمتخصصين الذين يجمعهم منظور الأنظمة الإنسانية. ويجمع كل تعاون الأشخاص الأنسب للنظام المعني.",
  ),
  library: text(
    "The Development Library is TOD's home for articles, reflections and practical perspectives on organizations, leadership and human systems. Every engagement is an opportunity to observe, practice, learn and reflect. The Library is where that learning is shared.",
    "مكتبة التطوير هي مساحة TOD للمقالات والتأملات والرؤى العملية حول المؤسسات والقيادة والأنظمة الإنسانية. كل تعاون فرصة للملاحظة والممارسة والتعلم والتأمل، وفي المكتبة نشارك ما نتعلمه.",
  ),
  contact: text(
    "Every engagement begins with understanding. Tell us a little about your organization and what you are working with, and we will arrange a first conversation.",
    "يبدأ كل تعاون بالفهم. أخبرنا قليلًا عن مؤسستك وما تعمل عليه، وسنرتب معك حوارًا أوليًا.",
  ),
  services: text(
    "TOD's services are designed around each client's context. They are organized into three streams, and services from more than one stream may be combined to create an integrated intervention for a specific organization, leadership team, board or family business.",
    "تُصمم خدمات TOD بحسب سياق كل عميل. وتنظم في ثلاثة مسارات، ويمكن الجمع بين خدمات من أكثر من مسار لتشكيل تدخل متكامل يناسب مؤسسة أو فريق قيادة أو مجلس إدارة أو عملًا عائليًا بعينه.",
  ),
  mission: text(
    "To help organizations build healthier relationships, wiser leadership, stronger cultures and greater adaptive capacity. We combine evidence-informed practice with a deeper understanding of human systems so that our work leaves people and organizations more capable than before.",
    "مساعدة المؤسسات على بناء علاقات أكثر صحة وقيادة أكثر حكمة وثقافات أقوى وقدرة أكبر على التكيف. نجمع بين الممارسة المستنيرة بالأدلة والفهم الأعمق للأنظمة الإنسانية، ليترك عملنا الأفراد والمؤسسات أكثر قدرة مما كانوا عليه.",
  ),
  vision: text(
    "To become a recognized body of knowledge and professional practice for understanding and developing human systems. Our longer-term ambition extends beyond consulting engagements toward a living institution where practice, learning, research and knowledge creation continually strengthen one another.",
    "أن نصبح مرجعًا معرفيًا ومهنيًا معترفًا به لفهم الأنظمة الإنسانية وتطويرها. ويتجاوز طموحنا بعيد المدى المشاريع الاستشارية نحو مؤسسة حية تعزز فيها الممارسة والتعلم والبحث وإنتاج المعرفة بعضها بعضًا باستمرار.",
  ),
};
export const metadataCopy: Record<string, { title: Text; description: Text }> =
  {
    "": {
      title: text(
        "TOD | Organizational Development Consultancy in Saudi Arabia",
        "TOD | استشارات التطوير المؤسسي في السعودية",
      ),
      description: text(
        "TOD helps leaders, boards and organizations in Saudi Arabia understand complexity, align around what matters and build lasting capability.",
        "تساعد TOD القادة ومجالس الإدارة والمؤسسات في السعودية على فهم التعقيد والتوافق حول ما يهم وبناء قدرات مستدامة.",
      ),
    },
    about: {
      title: text(
        "About TOD | Total Organization Development",
        "عن TOD | توتال أورغنايزيشن ديفيلوبمنت",
      ),
      description: text(
        "A Saudi-based organizational consulting practice focused on understanding and developing organizations as human systems.",
        "ممارسة استشارية مؤسسية مقرها السعودية، تركز على فهم المؤسسات وتطويرها بوصفها أنظمة إنسانية.",
      ),
    },
    approach: {
      title: text(
        "Our Approach | Human Systems | TOD",
        "منهجنا | الأنظمة الإنسانية | TOD",
      ),
      description: text(
        "How TOD sees, understands and works with organizations: Human Systems, the Five Layers of Seeing and our way of working.",
        "كيف ترى TOD المؤسسات وتفهمها وتعمل معها: الأنظمة الإنسانية وطبقات الرؤية الخمس وطريقتنا في العمل.",
      ),
    },
    services: {
      title: text(
        "Services | Governance, Leadership and Capability | TOD",
        "الخدمات | الحوكمة والقيادة والقدرات | TOD",
      ),
      description: text(
        "Board governance, executive alignment, coaching, mentoring programs and applied capability workshops, designed around each client's context.",
        "حوكمة المجالس والتوافق التنفيذي والكوتشينج وبرامج الإرشاد وورش بناء القدرات التطبيقية، وفق سياق كل عميل.",
      ),
    },
    "who-we-work-with": {
      title: text("Who We Work With | TOD", "مع من نعمل | TOD"),
      description: text(
        "Boards, executives, leadership teams, government entities and family businesses facing challenges that are as human as they are technical.",
        "مجالس الإدارة والقيادات وفرق القيادة والجهات الحكومية والأعمال العائلية التي تواجه تحديات إنسانية وتقنية.",
      ),
    },
    associates: {
      title: text("Leadership and Associates | TOD", "قيادتنا وخبراؤنا | TOD"),
      description: text(
        "Meet the leaders and specialist practitioners behind TOD’s work in leadership, organizations and human systems.",
        "تعرّف على قيادات TOD وخبرائها المتخصصين في القيادة والتطوير المؤسسي والأنظمة الإنسانية.",
      ),
    },
    library: {
      title: text("The Development Library | TOD", "مكتبة التطوير | TOD"),
      description: text(
        "Articles and perspectives on leadership, organizations and human systems in Saudi Arabia and the region.",
        "مقالات ورؤى حول القيادة والمؤسسات والأنظمة الإنسانية في السعودية والمنطقة.",
      ),
    },
    contact: {
      title: text(
        "Contact TOD | Start a Conversation",
        "تواصل مع TOD | ابدأ حوارًا",
      ),
      description: text(
        "Tell us about your organization and arrange a first conversation with TOD.",
        "حدثنا عن مؤسستك ورتب حوارًا أوليًا مع TOD.",
      ),
    },
  };
