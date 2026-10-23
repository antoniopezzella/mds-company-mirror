import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as ee}from"./roles-DNqHlq35.js";import{a as te,i as ne,n as re,o as ie,r as a,t as o}from"./date-picker-CALhKD7f.js";import{C as s,D as c,F as ae,I as oe,T as l,i as se,r as u,x as d}from"./calendar-DsOUbIGe.js";function ce(e,t,n){return ae(e,-t,n)}function le(){return(le=t((()=>{oe()})))()}var ue,de;function fe(){return(fe=t((()=>{ue={lessThanXSeconds:{one:`أقل من ثانية واحدة`,two:`أقل من ثانتين`,threeToTen:`أقل من {{count}} ثواني`,other:`أقل من {{count}} ثانية`},xSeconds:{one:`ثانية واحدة`,two:`ثانتين`,threeToTen:`{{count}} ثواني`,other:`{{count}} ثانية`},halfAMinute:`نصف دقيقة`,lessThanXMinutes:{one:`أقل من دقيقة`,two:`أقل من دقيقتين`,threeToTen:`أقل من {{count}} دقائق`,other:`أقل من {{count}} دقيقة`},xMinutes:{one:`دقيقة واحدة`,two:`دقيقتين`,threeToTen:`{{count}} دقائق`,other:`{{count}} دقيقة`},aboutXHours:{one:`ساعة واحدة تقريباً`,two:`ساعتين تقريباً`,threeToTen:`{{count}} ساعات تقريباً`,other:`{{count}} ساعة تقريباً`},xHours:{one:`ساعة واحدة`,two:`ساعتين`,threeToTen:`{{count}} ساعات`,other:`{{count}} ساعة`},xDays:{one:`يوم واحد`,two:`يومين`,threeToTen:`{{count}} أيام`,other:`{{count}} يوم`},aboutXWeeks:{one:`أسبوع واحد تقريباً`,two:`أسبوعين تقريباً`,threeToTen:`{{count}} أسابيع تقريباً`,other:`{{count}} أسبوع تقريباً`},xWeeks:{one:`أسبوع واحد`,two:`أسبوعين`,threeToTen:`{{count}} أسابيع`,other:`{{count}} أسبوع`},aboutXMonths:{one:`شهر واحد تقريباً`,two:`شهرين تقريباً`,threeToTen:`{{count}} أشهر تقريباً`,other:`{{count}} شهر تقريباً`},xMonths:{one:`شهر واحد`,two:`شهرين`,threeToTen:`{{count}} أشهر`,other:`{{count}} شهر`},aboutXYears:{one:`عام واحد تقريباً`,two:`عامين تقريباً`,threeToTen:`{{count}} أعوام تقريباً`,other:`{{count}} عام تقريباً`},xYears:{one:`عام واحد`,two:`عامين`,threeToTen:`{{count}} أعوام`,other:`{{count}} عام`},overXYears:{one:`أكثر من عام`,two:`أكثر من عامين`,threeToTen:`أكثر من {{count}} أعوام`,other:`أكثر من {{count}} عام`},almostXYears:{one:`عام واحد تقريباً`,two:`عامين تقريباً`,threeToTen:`{{count}} أعوام تقريباً`,other:`{{count}} عام تقريباً`}},de=(e,t,n)=>{let r,i=ue[e];return r=typeof i==`string`?i:t===1?i.one:t===2?i.two:t<=10?i.threeToTen.replace(`{{count}}`,String(t)):i.other.replace(`{{count}}`,String(t)),n?.addSuffix?n.comparison&&n.comparison>0?`في خلال `+r:`منذ `+r:r}})))()}var f,p,m,h;function g(){return(g=t((()=>{f={full:`EEEE, MMMM do, y`,long:`MMMM do, y`,medium:`MMM d, y`,short:`MM/dd/yyyy`},p={full:`h:mm:ss a zzzz`,long:`h:mm:ss a z`,medium:`h:mm:ss a`,short:`h:mm a`},m={full:`{{date}} 'عند' {{time}}`,long:`{{date}} 'عند' {{time}}`,medium:`{{date}}, {{time}}`,short:`{{date}}, {{time}}`},h={date:c({formats:f,defaultWidth:`full`}),time:c({formats:p,defaultWidth:`full`}),dateTime:c({formats:m,defaultWidth:`full`})}})))()}var _,v;function y(){return(y=t((()=>{_={lastWeek:`'أخر' eeee 'عند' p`,yesterday:`'أمس عند' p`,today:`'اليوم عند' p`,tomorrow:`'غداً عند' p`,nextWeek:`eeee 'عند' p`,other:`P`},v=(e,t,n,r)=>_[e]})))()}var b,x,S,C,w,T,E,D;function O(){return(O=t((()=>{b={narrow:[`ق`,`ب`],abbreviated:[`ق.م.`,`ب.م.`],wide:[`قبل الميلاد`,`بعد الميلاد`]},x={narrow:[`1`,`2`,`3`,`4`],abbreviated:[`ر1`,`ر2`,`ر3`,`ر4`],wide:[`الربع الأول`,`الربع الثاني`,`الربع الثالث`,`الربع الرابع`]},S={narrow:[`ي`,`ف`,`م`,`أ`,`م`,`ي`,`ي`,`أ`,`س`,`أ`,`ن`,`د`],abbreviated:[`ينا`,`فبر`,`مارس`,`أبريل`,`مايو`,`يونـ`,`يولـ`,`أغسـ`,`سبتـ`,`أكتـ`,`نوفـ`,`ديسـ`],wide:[`يناير`,`فبراير`,`مارس`,`أبريل`,`مايو`,`يونيو`,`يوليو`,`أغسطس`,`سبتمبر`,`أكتوبر`,`نوفمبر`,`ديسمبر`]},C={narrow:[`ح`,`ن`,`ث`,`ر`,`خ`,`ج`,`س`],short:[`أحد`,`اثنين`,`ثلاثاء`,`أربعاء`,`خميس`,`جمعة`,`سبت`],abbreviated:[`أحد`,`اثنـ`,`ثلا`,`أربـ`,`خميـ`,`جمعة`,`سبت`],wide:[`الأحد`,`الاثنين`,`الثلاثاء`,`الأربعاء`,`الخميس`,`الجمعة`,`السبت`]},w={narrow:{am:`ص`,pm:`م`,midnight:`ن`,noon:`ظ`,morning:`صباحاً`,afternoon:`بعد الظهر`,evening:`مساءاً`,night:`ليلاً`},abbreviated:{am:`ص`,pm:`م`,midnight:`نصف الليل`,noon:`ظهر`,morning:`صباحاً`,afternoon:`بعد الظهر`,evening:`مساءاً`,night:`ليلاً`},wide:{am:`ص`,pm:`م`,midnight:`نصف الليل`,noon:`ظهر`,morning:`صباحاً`,afternoon:`بعد الظهر`,evening:`مساءاً`,night:`ليلاً`}},T={narrow:{am:`ص`,pm:`م`,midnight:`ن`,noon:`ظ`,morning:`في الصباح`,afternoon:`بعد الظـهر`,evening:`في المساء`,night:`في الليل`},abbreviated:{am:`ص`,pm:`م`,midnight:`نصف الليل`,noon:`ظهر`,morning:`في الصباح`,afternoon:`بعد الظهر`,evening:`في المساء`,night:`في الليل`},wide:{am:`ص`,pm:`م`,midnight:`نصف الليل`,noon:`ظهر`,morning:`صباحاً`,afternoon:`بعد الظـهر`,evening:`في المساء`,night:`في الليل`}},E=e=>String(e),D={ordinalNumber:E,era:l({values:b,defaultWidth:`wide`}),quarter:l({values:x,defaultWidth:`wide`,argumentCallback:e=>e-1}),month:l({values:S,defaultWidth:`wide`}),day:l({values:C,defaultWidth:`wide`}),dayPeriod:l({values:w,defaultWidth:`wide`,formattingValues:T,defaultFormattingWidth:`wide`})}})))()}var k,A,j,M,N,P,pe,F,I,L,R,z,B;function V(){return(V=t((()=>{k=/^(\d+)(th|st|nd|rd)?/i,A=/\d+/i,j={narrow:/^(ق|ب)/i,abbreviated:/^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,wide:/^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i},M={any:[/^قبل/i,/^بعد/i]},N={narrow:/^[1234]/i,abbreviated:/^ر[1234]/i,wide:/^الربع [1234]/i},P={any:[/1/i,/2/i,/3/i,/4/i]},pe={narrow:/^[يفمأمسند]/i,abbreviated:/^(ين|ف|مار|أب|ماي|يون|يول|أغ|س|أك|ن|د)/i,wide:/^(ين|ف|مار|أب|ماي|يون|يول|أغ|س|أك|ن|د)/i},F={narrow:[/^ي/i,/^ف/i,/^م/i,/^أ/i,/^م/i,/^ي/i,/^ي/i,/^أ/i,/^س/i,/^أ/i,/^ن/i,/^د/i],any:[/^ين/i,/^ف/i,/^مار/i,/^أب/i,/^ماي/i,/^يون/i,/^يول/i,/^أغ/i,/^س/i,/^أك/i,/^ن/i,/^د/i]},I={narrow:/^[حنثرخجس]/i,short:/^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,abbreviated:/^(أحد|اثن|ثلا|أرب|خمي|جمعة|سبت)/i,wide:/^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i},L={narrow:[/^ح/i,/^ن/i,/^ث/i,/^ر/i,/^خ/i,/^ج/i,/^س/i],wide:[/^الأحد/i,/^الاثنين/i,/^الثلاثاء/i,/^الأربعاء/i,/^الخميس/i,/^الجمعة/i,/^السبت/i],any:[/^أح/i,/^اث/i,/^ث/i,/^أر/i,/^خ/i,/^ج/i,/^س/i]},R={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},z={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},B={ordinalNumber:d({matchPattern:k,parsePattern:A,valueCallback:e=>parseInt(e,10)}),era:s({matchPatterns:j,defaultMatchWidth:`wide`,parsePatterns:M,defaultParseWidth:`any`}),quarter:s({matchPatterns:N,defaultMatchWidth:`wide`,parsePatterns:P,defaultParseWidth:`any`,valueCallback:e=>e+1}),month:s({matchPatterns:pe,defaultMatchWidth:`wide`,parsePatterns:F,defaultParseWidth:`any`}),day:s({matchPatterns:I,defaultMatchWidth:`wide`,parsePatterns:L,defaultParseWidth:`any`}),dayPeriod:s({matchPatterns:R,defaultMatchWidth:`any`,parsePatterns:z,defaultParseWidth:`any`})}})))()}var me;function he(){return(he=t((()=>{fe(),g(),y(),O(),V(),me={code:`ar-SA`,formatDistance:de,formatLong:h,formatRelative:v,localize:D,match:B,options:{weekStartsOn:0,firstWeekContainsDate:1}}})))()}var H;function ge(){return(ge=t((()=>{he(),se(),H={...me,labels:{labelDayButton:(e,t,n,r)=>{let i=(r??new u(n)).format(e,`PPPP`);return t.today&&(i=`اليوم، ${i}`),t.selected&&(i=`${i}، محدد`),i},labelMonthDropdown:`اختر الشهر`,labelNext:`اذهب إلى الشهر التالي`,labelPrevious:`اذهب إلى الشهر السابق`,labelWeekNumber:e=>`الأسبوع ${e}`,labelYearDropdown:`اختر السنة`,labelGrid:(e,t,n)=>(n??new u(t)).formatMonthYear(e),labelGridcell:(e,t,n,r)=>{let i=(r??new u(n)).format(e,`PPPP`);return t?.today&&(i=`اليوم، ${i}`),i},labelNav:`شريط التنقل`,labelWeekNumberHeader:`رقم الأسبوع`,labelWeekday:(e,t,n)=>(n??new u(t)).format(e,`cccc`)}}})))()}var U,W,_e,G,K,q,J,Y,X,Z,Q,$,ve;function ye(){return(ye=t((()=>{U=e(n(),1),ge(),le(),ie(),i(),W=r(),_e={title:`Components/DatePicker`,component:o,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`# Date Picker

No MDS/Figma spec exists for this component — built matching every variant
on shadcn/ui's own official docs page
(https://ui.shadcn.com/docs/components/base/date-picker: Popover + Calendar
+ Button/Input compositions, no standalone DatePicker primitive exists in
shadcn's own registry either), styled with this repo's \`getRoleColor()\`
role tokens throughout — \`Calendar\` itself (see calendar.tsx) already
routes every day/nav/caption state through role tokens, so every variant
below inherits correct light/dark theming for free.`}}}},G={render:()=>{let[e,t]=U.useState();return(0,W.jsx)(o,{date:e,onDateChange:t})}},K={render:()=>{let[e,t]=U.useState(new Date(2026,8,1));return(0,W.jsx)(o,{date:e,onDateChange:t})}},q={render:()=>{let[e,t]=U.useState({from:new Date(2026,8,5),to:new Date(2026,8,12)});return(0,W.jsx)(a,{range:e,onRangeChange:t})}},J={name:`Date of Birth`,render:()=>{let[e,t]=U.useState(),n=new Date;return(0,W.jsx)(o,{date:e,onDateChange:t,placeholder:`Date of birth`,captionLayout:`dropdown`,startMonth:ce(n,100),endMonth:n})}},Y={render:()=>{let[e,t]=U.useState(new Date(2026,8,1));return(0,W.jsx)(re,{date:e,onDateChange:t,className:`w-[220px]`})}},X={render:()=>{let[e,t]=U.useState(new Date(2026,8,1,13,30));return(0,W.jsx)(ne,{date:e,onDateChange:t})}},Z={render:()=>{let[e,t]=U.useState();return(0,W.jsx)(te,{date:e,onDateChange:t,className:`w-[280px]`})},parameters:{docs:{description:{story:'Parses free text ("next Friday", "in 3 weeks", "Dec 25") via [chrono-node](https://github.com/wanasit/chrono) into a real `Date`, with a calendar fallback for manual picking.'}}}},Q={render:()=>{let[e,t]=U.useState(new Date(2026,8,1));return(0,W.jsx)(`div`,{dir:`rtl`,children:(0,W.jsx)(o,{date:e,onDateChange:t,locale:H,dir:`rtl`,placeholder:`اختر تاريخًا`})})}},$={parameters:{layout:`padded`},render:()=>{let[e,t]=U.useState(new Date(2026,8,1)),[n,r]=U.useState({from:new Date(2026,8,5),to:new Date(2026,8,12)}),[i,ie]=U.useState(),[s,c]=U.useState(new Date(2026,8,1)),[ae,oe]=U.useState(new Date(2026,8,1,13,30)),[l,se]=U.useState(),u=new Date,d=({label:e,children:t})=>(0,W.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,W.jsx)(`span`,{className:`text-sm font-medium`,style:{color:ee(`fg.neutral.subtle`)},children:e}),t]});return(0,W.jsxs)(`div`,{className:`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3`,children:[(0,W.jsx)(d,{label:`Basic`,children:(0,W.jsx)(o,{date:e,onDateChange:t})}),(0,W.jsx)(d,{label:`Range Picker`,children:(0,W.jsx)(a,{range:n,onRangeChange:r})}),(0,W.jsx)(d,{label:`Date of Birth`,children:(0,W.jsx)(o,{date:i,onDateChange:ie,placeholder:`Date of birth`,captionLayout:`dropdown`,startMonth:ce(u,100),endMonth:u})}),(0,W.jsx)(d,{label:`Input Field Variant`,children:(0,W.jsx)(re,{date:s,onDateChange:c,className:`w-[220px]`})}),(0,W.jsx)(d,{label:`Time Picker`,children:(0,W.jsx)(ne,{date:ae,onDateChange:oe})}),(0,W.jsx)(d,{label:`Natural Language Picker`,children:(0,W.jsx)(te,{date:l,onDateChange:se,className:`w-[260px]`})}),(0,W.jsx)(d,{label:`RTL Support`,children:(0,W.jsx)(`div`,{dir:`rtl`,children:(0,W.jsx)(o,{date:e,onDateChange:t,locale:H,dir:`rtl`,placeholder:`اختر تاريخًا`})})})]})}},ve=[`Default`,`WithSelectedDate`,`RangePicker`,`DateOfBirth`,`InputFieldVariant`,`TimePicker`,`NaturalLanguagePicker`,`RTLSupport`,`AllVariants`],G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return <DatePicker date={date} onDateChange={setDate} />;
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    return <DatePicker date={date} onDateChange={setDate} />;
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 8, 5),
      to: new Date(2026, 8, 12)
    });
    return <DateRangePicker range={range} onRangeChange={setRange} />;
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Date of Birth',
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const today = new Date();
    return <DatePicker date={date} onDateChange={setDate} placeholder="Date of birth" captionLayout="dropdown" startMonth={subYears(today, 100)} endMonth={today} />;
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    return <DatePickerInput date={date} onDateChange={setDate} className="w-[220px]" />;
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1, 13, 30));
    return <DateTimePicker date={date} onDateChange={setDate} />;
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));
    return <div dir="rtl">
        <DatePicker date={date} onDateChange={setDate} locale={arSA} dir="rtl" placeholder="اختر تاريخًا" />
      </div>;
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
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
        color: getRoleColor('fg.neutral.subtle')
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
}`,...$.parameters?.docs?.source}}}})))()}ye();export{$ as AllVariants,J as DateOfBirth,G as Default,Y as InputFieldVariant,Z as NaturalLanguagePicker,Q as RTLSupport,q as RangePicker,X as TimePicker,K as WithSelectedDate,ve as __namedExportsOrder,_e as default};