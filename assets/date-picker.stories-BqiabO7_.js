import{a5 as o,Z as a,N as B}from"./iframe-CPBTUrEW.js";import{D as d,b as R,a as k,c as v,S as T}from"./date-picker-t-CIrsQu.js";import{b as I,c as S,d as l,e as u,f as Y,D as m}from"./calendar-CfacuH8P.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./control-size-rvCN7ZpI.js";import"./button-_tNb_vhW.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./createLucideIcon-BnpAccaP.js";import"./input-BSCHIFmj.js";import"./prop-compat-ClktB6p5.js";import"./popover-B1Y9L4uz.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-U0y7uecN.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-ydzPhmoe.js";import"./calendar-BknvOJFQ.js";import"./check-KuCy08bp.js";import"./x-Bk_wSNf2.js";import"./chevron-left-N_nrbjRa.js";import"./chevron-right-BXCmPxW2.js";function C(e,t,n){return I(e,-100,n)}const z={lessThanXSeconds:{one:"أقل من ثانية واحدة",two:"أقل من ثانتين",threeToTen:"أقل من {{count}} ثواني",other:"أقل من {{count}} ثانية"},xSeconds:{one:"ثانية واحدة",two:"ثانتين",threeToTen:"{{count}} ثواني",other:"{{count}} ثانية"},halfAMinute:"نصف دقيقة",lessThanXMinutes:{one:"أقل من دقيقة",two:"أقل من دقيقتين",threeToTen:"أقل من {{count}} دقائق",other:"أقل من {{count}} دقيقة"},xMinutes:{one:"دقيقة واحدة",two:"دقيقتين",threeToTen:"{{count}} دقائق",other:"{{count}} دقيقة"},aboutXHours:{one:"ساعة واحدة تقريباً",two:"ساعتين تقريباً",threeToTen:"{{count}} ساعات تقريباً",other:"{{count}} ساعة تقريباً"},xHours:{one:"ساعة واحدة",two:"ساعتين",threeToTen:"{{count}} ساعات",other:"{{count}} ساعة"},xDays:{one:"يوم واحد",two:"يومين",threeToTen:"{{count}} أيام",other:"{{count}} يوم"},aboutXWeeks:{one:"أسبوع واحد تقريباً",two:"أسبوعين تقريباً",threeToTen:"{{count}} أسابيع تقريباً",other:"{{count}} أسبوع تقريباً"},xWeeks:{one:"أسبوع واحد",two:"أسبوعين",threeToTen:"{{count}} أسابيع",other:"{{count}} أسبوع"},aboutXMonths:{one:"شهر واحد تقريباً",two:"شهرين تقريباً",threeToTen:"{{count}} أشهر تقريباً",other:"{{count}} شهر تقريباً"},xMonths:{one:"شهر واحد",two:"شهرين",threeToTen:"{{count}} أشهر",other:"{{count}} شهر"},aboutXYears:{one:"عام واحد تقريباً",two:"عامين تقريباً",threeToTen:"{{count}} أعوام تقريباً",other:"{{count}} عام تقريباً"},xYears:{one:"عام واحد",two:"عامين",threeToTen:"{{count}} أعوام",other:"{{count}} عام"},overXYears:{one:"أكثر من عام",two:"أكثر من عامين",threeToTen:"أكثر من {{count}} أعوام",other:"أكثر من {{count}} عام"},almostXYears:{one:"عام واحد تقريباً",two:"عامين تقريباً",threeToTen:"{{count}} أعوام تقريباً",other:"{{count}} عام تقريباً"}},X=(e,t,n)=>{let r;const i=z[e];return typeof i=="string"?r=i:t===1?r=i.one:t===2?r=i.two:t<=10?r=i.threeToTen.replace("{{count}}",String(t)):r=i.other.replace("{{count}}",String(t)),n?.addSuffix?n.comparison&&n.comparison>0?"في خلال "+r:"منذ "+r:r},O={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},_={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},$={full:"{{date}} 'عند' {{time}}",long:"{{date}} 'عند' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},q={date:S({formats:O,defaultWidth:"full"}),time:S({formats:_,defaultWidth:"full"}),dateTime:S({formats:$,defaultWidth:"full"})},H={lastWeek:"'أخر' eeee 'عند' p",yesterday:"'أمس عند' p",today:"'اليوم عند' p",tomorrow:"'غداً عند' p",nextWeek:"eeee 'عند' p",other:"P"},G=(e,t,n,r)=>H[e],Q={narrow:["ق","ب"],abbreviated:["ق.م.","ب.م."],wide:["قبل الميلاد","بعد الميلاد"]},Z={narrow:["1","2","3","4"],abbreviated:["ر1","ر2","ر3","ر4"],wide:["الربع الأول","الربع الثاني","الربع الثالث","الربع الرابع"]},J={narrow:["ي","ف","م","أ","م","ي","ي","أ","س","أ","ن","د"],abbreviated:["ينا","فبر","مارس","أبريل","مايو","يونـ","يولـ","أغسـ","سبتـ","أكتـ","نوفـ","ديسـ"],wide:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]},K={narrow:["ح","ن","ث","ر","خ","ج","س"],short:["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"],abbreviated:["أحد","اثنـ","ثلا","أربـ","خميـ","جمعة","سبت"],wide:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]},U={narrow:{am:"ص",pm:"م",midnight:"ن",noon:"ظ",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءاً",night:"ليلاً"},abbreviated:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءاً",night:"ليلاً"},wide:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءاً",night:"ليلاً"}},ee={narrow:{am:"ص",pm:"م",midnight:"ن",noon:"ظ",morning:"في الصباح",afternoon:"بعد الظـهر",evening:"في المساء",night:"في الليل"},abbreviated:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"في الصباح",afternoon:"بعد الظهر",evening:"في المساء",night:"في الليل"},wide:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"صباحاً",afternoon:"بعد الظـهر",evening:"في المساء",night:"في الليل"}},te=e=>String(e),ae={ordinalNumber:te,era:l({values:Q,defaultWidth:"wide"}),quarter:l({values:Z,defaultWidth:"wide",argumentCallback:e=>e-1}),month:l({values:J,defaultWidth:"wide"}),day:l({values:K,defaultWidth:"wide"}),dayPeriod:l({values:U,defaultWidth:"wide",formattingValues:ee,defaultFormattingWidth:"wide"})},ne=/^(\d+)(th|st|nd|rd)?/i,re=/\d+/i,oe={narrow:/^(ق|ب)/i,abbreviated:/^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,wide:/^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i},se={any:[/^قبل/i,/^بعد/i]},ie={narrow:/^[1234]/i,abbreviated:/^ر[1234]/i,wide:/^الربع [1234]/i},de={any:[/1/i,/2/i,/3/i,/4/i]},ce={narrow:/^[يفمأمسند]/i,abbreviated:/^(ين|ف|مار|أب|ماي|يون|يول|أغ|س|أك|ن|د)/i,wide:/^(ين|ف|مار|أب|ماي|يون|يول|أغ|س|أك|ن|د)/i},le={narrow:[/^ي/i,/^ف/i,/^م/i,/^أ/i,/^م/i,/^ي/i,/^ي/i,/^أ/i,/^س/i,/^أ/i,/^ن/i,/^د/i],any:[/^ين/i,/^ف/i,/^مار/i,/^أب/i,/^ماي/i,/^يون/i,/^يول/i,/^أغ/i,/^س/i,/^أك/i,/^ن/i,/^د/i]},ue={narrow:/^[حنثرخجس]/i,short:/^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,abbreviated:/^(أحد|اثن|ثلا|أرب|خمي|جمعة|سبت)/i,wide:/^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i},me={narrow:[/^ح/i,/^ن/i,/^ث/i,/^ر/i,/^خ/i,/^ج/i,/^س/i],wide:[/^الأحد/i,/^الاثنين/i,/^الثلاثاء/i,/^الأربعاء/i,/^الخميس/i,/^الجمعة/i,/^السبت/i],any:[/^أح/i,/^اث/i,/^ث/i,/^أر/i,/^خ/i,/^ج/i,/^س/i]},he={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},pe={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},ge={ordinalNumber:Y({matchPattern:ne,parsePattern:re,valueCallback:e=>parseInt(e,10)}),era:u({matchPatterns:oe,defaultMatchWidth:"wide",parsePatterns:se,defaultParseWidth:"any"}),quarter:u({matchPatterns:ie,defaultMatchWidth:"wide",parsePatterns:de,defaultParseWidth:"any",valueCallback:e=>e+1}),month:u({matchPatterns:ce,defaultMatchWidth:"wide",parsePatterns:le,defaultParseWidth:"any"}),day:u({matchPatterns:ue,defaultMatchWidth:"wide",parsePatterns:me,defaultParseWidth:"any"}),dayPeriod:u({matchPatterns:he,defaultMatchWidth:"any",parsePatterns:pe,defaultParseWidth:"any"})},De={code:"ar-SA",formatDistance:X,formatLong:q,formatRelative:G,localize:ae,match:ge,options:{weekStartsOn:0,firstWeekContainsDate:1}},M={...De,labels:{labelDayButton:(e,t,n,r)=>{let s=(r??new m(n)).format(e,"PPPP");return t.today&&(s=`اليوم، ${s}`),t.selected&&(s=`${s}، محدد`),s},labelMonthDropdown:"اختر الشهر",labelNext:"اذهب إلى الشهر التالي",labelPrevious:"اذهب إلى الشهر السابق",labelWeekNumber:e=>`الأسبوع ${e}`,labelYearDropdown:"اختر السنة",labelGrid:(e,t,n)=>(n??new m(t)).formatMonthYear(e),labelGridcell:(e,t,n,r)=>{let s=(r??new m(n)).format(e,"PPPP");return t?.today&&(s=`اليوم، ${s}`),s},labelNav:"شريط التنقل",labelWeekNumberHeader:"رقم الأسبوع",labelWeekday:(e,t,n)=>(n??new m(t)).format(e,"cccc")}},Qe={title:"Components/DatePicker",component:d,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`# Date Picker

No MDS/Figma spec exists for this component — built matching every variant
on shadcn/ui's own official docs page
(https://ui.shadcn.com/docs/components/base/date-picker: Popover + Calendar
+ Button/Input compositions, no standalone DatePicker primitive exists in
shadcn's own registry either), styled with this repo's \`getRoleColor()\`
role tokens throughout — \`Calendar\` itself (see calendar.tsx) already
routes every day/nav/caption state through role tokens, so every variant
below inherits correct light/dark theming for free.`}}}},h={render:()=>{const[e,t]=o.useState();return a.jsx(d,{date:e,onDateChange:t})}},p={render:()=>{const[e,t]=o.useState(new Date(2026,8,1));return a.jsx(d,{date:e,onDateChange:t})}},g={render:()=>{const[e,t]=o.useState({from:new Date(2026,8,5),to:new Date(2026,8,12)});return a.jsx(R,{range:e,onRangeChange:t})}},D={name:"Date of Birth",render:()=>{const[e,t]=o.useState(),n=new Date;return a.jsx(d,{date:e,onDateChange:t,placeholder:"Date of birth",captionLayout:"dropdown",startMonth:C(n),endMonth:n})}},w={render:()=>{const[e,t]=o.useState(new Date(2026,8,1));return a.jsx(k,{date:e,onDateChange:t,className:"w-[220px]"})}},f={render:()=>{const[e,t]=o.useState(new Date(2026,8,1,13,30));return a.jsx(v,{date:e,onDateChange:t})}},b={render:()=>{const[e,t]=o.useState();return a.jsx(T,{date:e,onDateChange:t,className:"w-[280px]"})},parameters:{docs:{description:{story:'Parses free text ("next Friday", "in 3 weeks", "Dec 25") via [chrono-node](https://github.com/wanasit/chrono) into a real `Date`, with a calendar fallback for manual picking.'}}}},P={render:()=>{const[e,t]=o.useState(new Date(2026,8,1));return a.jsx("div",{dir:"rtl",children:a.jsx(d,{date:e,onDateChange:t,locale:M,dir:"rtl",placeholder:"اختر تاريخًا"})})}},y={parameters:{layout:"padded"},render:()=>{const[e,t]=o.useState(new Date(2026,8,1)),[n,r]=o.useState({from:new Date(2026,8,5),to:new Date(2026,8,12)}),[i,s]=o.useState(),[N,W]=o.useState(new Date(2026,8,1)),[j,L]=o.useState(new Date(2026,8,1,13,30)),[F,A]=o.useState(),x=new Date,c=({label:V,children:E})=>a.jsxs("div",{className:"flex flex-col gap-2",children:[a.jsx("span",{className:"text-sm font-medium",style:{color:B("text.secondary")},children:V}),E]});return a.jsxs("div",{className:"grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",children:[a.jsx(c,{label:"Basic",children:a.jsx(d,{date:e,onDateChange:t})}),a.jsx(c,{label:"Range Picker",children:a.jsx(R,{range:n,onRangeChange:r})}),a.jsx(c,{label:"Date of Birth",children:a.jsx(d,{date:i,onDateChange:s,placeholder:"Date of birth",captionLayout:"dropdown",startMonth:C(x),endMonth:x})}),a.jsx(c,{label:"Input Field Variant",children:a.jsx(k,{date:N,onDateChange:W,className:"w-[220px]"})}),a.jsx(c,{label:"Time Picker",children:a.jsx(v,{date:j,onDateChange:L})}),a.jsx(c,{label:"Natural Language Picker",children:a.jsx(T,{date:F,onDateChange:A,className:"w-[260px]"})}),a.jsx(c,{label:"RTL Support",children:a.jsx("div",{dir:"rtl",children:a.jsx(d,{date:e,onDateChange:t,locale:M,dir:"rtl",placeholder:"اختر تاريخًا"})})})]})}},Ze=["Default","WithSelectedDate","RangePicker","DateOfBirth","InputFieldVariant","TimePicker","NaturalLanguagePicker","RTLSupport","AllVariants"];h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return <DatePicker date={date} onDateChange={setDate} />;
  }
}`,...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    return <DatePicker date={date} onDateChange={setDate} />;
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 8, 5),
      to: new Date(2026, 8, 12)
    });
    return <DateRangePicker range={range} onRangeChange={setRange} />;
  }
}`,...g.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Date of Birth',
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const today = new Date();
    return <DatePicker date={date} onDateChange={setDate} placeholder="Date of birth" captionLayout="dropdown" startMonth={subYears(today, 100)} endMonth={today} />;
  }
}`,...D.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    return <DatePickerInput date={date} onDateChange={setDate} className="w-[220px]" />;
  }
}`,...w.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1, 13, 30));
    return <DateTimePicker date={date} onDateChange={setDate} />;
  }
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return <SmartDatePicker date={date} onDateChange={setDate} className="w-[280px]" />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Parses free text ("next Friday", "in 3 weeks", "Dec 25") via [chrono-node](https://github.com/wanasit/chrono) into a real \`Date\`, with a calendar fallback for manual picking.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    return <div dir="rtl">
        <DatePicker date={date} onDateChange={setDate} locale={arSA} dir="rtl" placeholder="اختر تاريخًا" />
      </div>;
  }
}`,...P.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => {
    const [single, setSingle] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 8, 5),
      to: new Date(2026, 8, 12)
    });
    const [dob, setDob] = React.useState<Date | undefined>();
    const [inputDate, setInputDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    const [dateTime, setDateTime] = React.useState<Date | undefined>(new Date(2026, 8, 1, 13, 30));
    const [smart, setSmart] = React.useState<Date | undefined>();
    const today = new Date();
    const Row: React.FC<{
      label: string;
      children: React.ReactNode;
    }> = ({
      label,
      children
    }) => <div className="flex flex-col gap-2">
        <span className="text-sm font-medium" style={{
        color: getRoleColor('text.secondary')
      }}>
          {label}
        </span>
        {children}
      </div>;
    return <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Row label="Basic">
          <DatePicker date={single} onDateChange={setSingle} />
        </Row>
        <Row label="Range Picker">
          <DateRangePicker range={range} onRangeChange={setRange} />
        </Row>
        <Row label="Date of Birth">
          <DatePicker date={dob} onDateChange={setDob} placeholder="Date of birth" captionLayout="dropdown" startMonth={subYears(today, 100)} endMonth={today} />
        </Row>
        <Row label="Input Field Variant">
          <DatePickerInput date={inputDate} onDateChange={setInputDate} className="w-[220px]" />
        </Row>
        <Row label="Time Picker">
          <DateTimePicker date={dateTime} onDateChange={setDateTime} />
        </Row>
        <Row label="Natural Language Picker">
          <SmartDatePicker date={smart} onDateChange={setSmart} className="w-[260px]" />
        </Row>
        <Row label="RTL Support">
          <div dir="rtl">
            <DatePicker date={single} onDateChange={setSingle} locale={arSA} dir="rtl" placeholder="اختر تاريخًا" />
          </div>
        </Row>
      </div>;
  }
}`,...y.parameters?.docs?.source}}};export{y as AllVariants,D as DateOfBirth,h as Default,w as InputFieldVariant,b as NaturalLanguagePicker,P as RTLSupport,g as RangePicker,f as TimePicker,p as WithSelectedDate,Ze as __namedExportsOrder,Qe as default};
