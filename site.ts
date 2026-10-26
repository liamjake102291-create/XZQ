export const RECRUIT_DEADLINE = '2026.10.19 24:00';
// Change this single value to true when a confirmed new round opens.
export const IS_OPEN = false;

export const stats = [
  { value: 20, suffix: '+', label: '省部级以上荣誉', en: 'HONORS' },
  { value: 9, suffix: '', label: '计算机软件著作权', en: 'SOFTWARE COPYRIGHT' },
  { value: 40000, suffix: '+', label: '活动累计覆盖人次', en: 'REACH' },
  { value: 2, suffix: '', label: '连续两年全国一等奖', en: 'NATIONAL FIRST PRIZE' },
];

export const honors = [
  ['教育部全国高校网络文化技术创新大会 一等奖（连续两年，全国唯一）', 'NATIONAL · 2 YEARS'],
  ['教育部高校思政工作平台「高校学生心理健康工作优秀成果」', 'MINISTRY'],
  ['上海市青年文明号备案', 'SHANGHAI'],
  ['「挑战杯」上海市大学生创业计划大赛 二等奖（连续多届）', 'PROVINCIAL'],
  ['中国国际大学生创新大赛 上海市铜奖（连续多届）', 'PROVINCIAL'],
  ['大学生创新创业训练计划 国家级 / 上海市级项目结项', 'NATIONAL'],
  ['入驻本校创业园区落地', 'CAMPUS'],
];

export const gains = [
  { code: 'PROJECT / PRACTICE', title: '真实项目经历', desc: '参与 AI 产品研发、校园活动策划与公益实践。你的想法会被真的做出来，而不是停在方案里。', highlights: ['AI 产品研发', '校园活动策划', '公益实践'] },
  { code: 'COMPETITION / PORTFOLIO', title: '竞赛与荣誉机会', desc: '接触科创竞赛、创新创业项目与成果申报，在实战中积累能写进简历的东西。', highlights: ['科创竞赛', '创新创业项目', '成果申报'] },
  { code: 'SKILLS / GROWTH', title: '多维能力成长', desc: '组织策划、沟通协作、创意设计、产品思维与 AI 应用，五项一起长。', highlights: ['组织策划', '沟通协作', '产品思维', 'AI 应用'] },
  { code: 'TEAM / COMMUNITY', title: '温暖的团队伙伴', desc: '认识志同道合的朋友，在合作中探索，在陪伴中共同成长。', highlights: ['共同探索', '协作实践', '陪伴成长'] },
];

export const process = [
  ['Part A · 潜力观察（必做）', '完成报名问卷，回答几个简短问题。我们想看你的思考方式和行动力，不是标准答案。'],
  ['Part B · 方向挑战（7 选 1）', '从三个方向里选一道命题，按题目要求提交作品。只做一道，不用全做。'],
  ['提交与评审', '支持 PPT、PDF、Word、图片、短视频、代码文件、网页链接、GitHub 仓库等形式。'],
];

export type Track = { name: string; challenges: Challenge[] };
export type Challenge = { id: string; title: string; background?: string; task: string; submit: string; focus: string };
export const tracks: Track[] = [
  { name: '活动策划与组织执行', challenges: [
    { id:'01', title:'策划学校 525 心理健康日心理游园会', background:'面向我校上川路校区学生，帮助同学缓解压力、增进交流。现有条件：总预算不超过 1000 元；可调配工作人员 6 名；预计参与 200 人；时长 2 小时；可使用学校提供的活动场地。', task:'策划一场大学生真正愿意参加的活动。需要回答：活动叫什么、为什么办；参与者具体做什么；工作人员如何分工；1000 元如何分配；怎样做反馈和复盘。', submit:'Word / PDF 方案，可附流程图、物资清单、购买链接', focus:'创造力 · 预算意识 · 组织规划 · 执行能力' },
    { id:'02', title:'假如你是工作室的小管家', background:'工作室 20 名成员，分多个项目组。常见问题：成员常忘会议、进度不透明、任务分配后缺少跟进、活动结束资料找不到、部分成员不清楚自己该做什么。', task:'设计一套简单、易执行的日常管理方案，至少包含：沟通与通知机制、任务分配与跟进、例会安排、活动资料归档。', submit:'Word / PDF 方案，可附自制管理表格', focus:'系统思维 · 组织管理 · 效率意识 · 责任心' }
  ]},
  { name: '创意宣传与新媒体运营', challenges: [
    { id:'03', title:'让更多人认识心智桥', background:'很多同学不了解心智桥在做什么，也不清楚加入后能获得哪些成长机会。', task:'从大学生视角出发，做一份能吸引同龄人关注的宣传内容：招新海报 1 张 / 公众号推文 1 篇（秀米更佳）/ 自制或 AI 短视频。', submit:'作品 + 创作思路（Word / PDF）', focus:'审美 · 创意表达 · 传播意识 · 受众理解' },
    { id:'04', title:'AI × 心理创新项目介绍 PPT', background:'「晴屿」是一个 AI 大学生情绪支持 / 沟通训练项目。你需要在一次校园科创展示中，让第一次了解它的评委在短时间内看懂核心价值。', task:'把原始资料整理成 4 页、16:9 横版 PPT，重点展现：项目背景、产品介绍、创新价值、应用前景。可自主调整页面结构与顺序。（原题一处写“3～4 页”、一处写“4～5 页”，按 4 页执行，允许 4–5 页弹性。）', submit:'PPT 源文件，建议附 PDF 预览', focus:'信息提炼 · 逻辑 · 项目理解 · 视觉审美 · 独立思考' }
  ]},
  { name: '产品创新与 AI 技术', challenges: [
    { id:'05', title:'发现一个校园里的产品机会', background:'校园里有很多不够方便的场景：活动报名、信息查询、学习计划、习惯养成。', task:'选择一个你真实体验过的问题，构思一个简单的数字化产品。需要说明：谁遇到这个问题；现有方式哪里不足；你的方案如何工作；最核心的一个功能是什么。', submit:'产品构想或 PRD（Word / PDF），可附手绘或数字草图', focus:'用户洞察 · 产品思维 · 需求判断 · 创新能力' },
    { id:'06', title:'让 AI 真正帮助你完成一件事', background:'用 AI 不该只是“输入问题、复制答案”。', task:'选一件学习或校园生活中的真实任务，用 AI 完成或改进工作流。例如：整理学习计划、设计报名表、制作排班、搭建知识整理流程、设计一个简单 AI 助手。', submit:'任务说明 + 关键操作记录 + 最终效果 + 简短复盘', focus:'AI 应用 · 工具学习 · 判断力 · 迭代意识' },
    { id:'07', title:'把一个想法做成小作品', task:'做一个能实际操作的小工具，内容不限：番茄钟、待办清单、心情记录器、随机鼓励语生成器、简单互动小游戏、AI 对话页、个人学习管理网页。可独立编程，也可 AI 辅助。', submit:'作品链接 / 代码文件 / 演示视频 + 简短开发说明', focus:'AI 应用 · 动手能力 · 自主学习 · 技术探索 · 问题解决' }
  ]},
];

export const aiRules = [
  { title:'允许', items:['用 AI 辅助构思、资料整理与信息检索','用 AI 辅助制作海报、文案与演示材料','用 AI 辅助编程、调试及理解技术问题','对 AI 生成的内容进行评价、修改和优化'] },
  { title:'需要遵守的原则', items:['提交的作品应当是你能够理解、解释和负责的','如实说明 AI 参与的主要环节，不得虚构个人经历、访谈、实际测试或活动成果','不要把未经核实的 AI 输出当作真实数据或事实','保留必要的构思记录、草稿或关键迭代过程'] },
  { title:'特别提醒', items:['我们不会仅凭所谓的“AI 生成率”判断作品质量。我们更关注：你是否真正理解任务，能否解释自己的选择，以及是否具有继续改进作品的能力。'] },
];

export const scoring = [
  ['问题洞察与理解能力',25],['独立思考与创新意识',25],['实际执行与可行性',20],['主动性与学习潜力',20],['表达与复盘能力',10]
] as const;
