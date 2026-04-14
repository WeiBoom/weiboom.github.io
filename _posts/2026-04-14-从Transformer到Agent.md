---
title: Learn AI | From Transformer To Agent
date: 2026-04-14
tags: 
    - AI
    - AIGC
---


# 理解、学习AI核心名词｜从Transformer到Agent

> （注：文档部分内容可能由 AI 生成）

如今AI已经渗透到生活和工作的方方面面，打开手机能刷到AI生成的内容，工作中能用AI写文案、做分析，甚至聊天时都能和AI智能对话。但面对Transformer、大模型、Agent这些高频词汇，很多人难免会犯懵——它们到底是什么？之间有什么关联？

## 文章结构
- [Transformer（转换器）](#transformer)
- [大模型 / LLM](#llm)
- [Multimodal（多模态模型）](#multimodal)
- [Agent（智能体）](#agent)
- [Skill（技能）](#skill)
- [Tool Calling（工具调用）](#tool-calling)
- [CLI（命令行界面）](#cli)
- [MCP](#mcp)
- [Prompt（提示词）](#prompt)
- [Fine-tuning（微调）](#fine-tuning)
- [RAG（检索增强生成）](#rag)
- [Harness Engineering（驾驭工程）](#harness-engineering)
- [AI名词关系梳理](#ai名词关系)

## 一、底层基石：AI的“建筑骨架”

<a id="transformer"></a>
### 1. Transformer（转换器）

**核心定义**：2017年由谷歌团队提出的一种神经网络架构，它是近几年最主流的现代大模型的基础之一，尤其是大多数语言模型和多模态模型都基于它或其变体构建。

**核心特点**：
- 采用「自注意力机制」（Self-Attention）：能理解输入序列中各位置之间的关联。比如分辨“他喜欢打篮球，它很圆”中两个“它”的不同指代。
- 支持并行训练：比传统RNN更强，也更适合处理较长文本。但实际可处理的长度仍受上下文窗口大小限制。
- 通用性极强：不仅能用于文本生成、机器翻译，也能适配图像、音频、视频等多模态任务。

**参考链接**：
- [Attention is All You Need（原始论文）](https://arxiv.org/abs/1706.03762)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)

**通俗类比**：如果把大模型比作“超级大脑”，Transformer就是大脑的“神经中枢”，没有它，大模型就无法正常思考和工作。

**Transformer 结构图（Command Line Interface 风格）**：
```
MonaLisa@monasmachine my-repo $ copilot
╭────────────────────────────────────────────────────────╮
   ██████  ██      ████              ┌─────────┐           
   ██      ██       ██               │ ◠   ◠    │
   ██      ██       ██               │   ——   │
   ██      ██       ██               └─────────┘
   ██████  ██████  ████              Hello World
╰────────────────────────────────────────────────────────╯
~/your-project

Type @ to mention files, / for commands, or ? for shortcuts
shift+tab switch mode
╰────────────────────────────────────────────────────────╯
[HOME] ~/my-repo
> Type @ to mention files, / for commands, or ? for shortcuts
  shift+tab switch mode
> run transformer --input "今天天气如何"
────────────────────────────────────────────────────────
[INPUT]    "今天天气如何"
[TOKEN]    tokenization
[EMBED]     embedding + positional encoding
[ATTN]     self-attention
[FFN]      feed-forward network
[LOOP]     repeat N layers
[OUTPUT]   decoder generates response
────────────────────────────────────────────────────────
[STATUS]   completed
```
- 关键点：自注意力让模型“看到整句话”，编码器理解输入，解码器生成输出。

## 二、核心主体：AI的“超级大脑”

<a id="llm"></a>
### 2. 大模型 / LLM（Large Language Model，大语言模型）

**核心定义**：通常基于Transformer架构训练而成，参数规模达到亿级、百亿级甚至万亿级，能理解人类语言、生成文本、进行基本推理的AI模型，是AI的“核心大脑”。

**核心特点**：
- 参数规模大、数据丰富的模型通常能力更强，但更关键的是模型架构、训练数据和训练方法的综合优化。
- 具备“涌现能力”：训练到一定规模后，会出现原本没被显式训练的能力，比如更复杂的推理、算术、语言迁移。
- 依赖海量数据训练：训练数据涵盖书籍、网页、论文等多类文本，让模型学习语言逻辑和常识知识。

**参考链接**：
- [GPT-4](https://openai.com/research/gpt-4)
- [LLaMA](https://ai.facebook.com/blog/large-language-model-llama-meta-ai/)

**常见实例**：GPT-4、Claude、Llama、文心一言、通义千问。

**通俗类比**：大模型就像一个“饱读诗书的智者”，读遍了天下的书，能回答你的各种问题、帮你完成各种文字相关的工作，而Transformer就是它的“大脑结构”。

**大模型能力对比（Command Line Interface 风格）**：
```
MonaLisa@monasmachine my-repo $ copilot
╭────────────────────────────────────────────────────────╮
   ██████  ██      ████              ┌─────────┐           
   ██      ██       ██               │ ◡   ◡    │
   ██      ██       ██               │   ——   │
   ██      ██       ██               └─────────┘
   ██████  ██████  ████              Hello World
╰────────────────────────────────────────────────────────╯
~/your-project

Type @ to mention files, / for commands, or ? for shortcuts
shift+tab switch mode
╰────────────────────────────────────────────────────────╯
[HOME] ~/my-repo
> Type @ to mention files, / for commands, or ? for shortcuts
  shift+tab switch mode
> model compare --type basic
────────────────────────────────────────────────────────
[MODEL]   base-llm
[RESULT]  simple Q&A
          keyword matching
          fixed replies

> model compare --type large
────────────────────────────────────────────────────────
[MODEL]   gpt-4-like
[RESULT]  long-form writing
          logical reasoning
          multi-turn dialogue
```
- 说明：大模型的优势不仅在于参数数量，更在于“上下文理解”和“连贯生成”。

<a id="multimodal"></a>
### 3. Multimodal（多模态模型）

**核心定义**：在大模型的基础上，增加了对图像、音频、视频等多种类型信息的处理能力，打破了“只能处理文本”的局限，能实现“看图说话”“听声辨意”。

**核心特点**：
- 跨模态理解：能将文本、图片、音频关联起来，比如给一张猫的图片，生成“一只橘色的小猫，正趴在沙发上睡觉”。
- 多模态生成：部分模型还能生成图片、音频等内容，增强了AI的表现力。

**参考链接**：
- [GPT-4V](https://openai.com/research/gpt-4v)
- [MidJourney](https://www.midjourney.com/)

**常见实例**：GPT-4V（能看图）、豆包多模态版、MidJourney（生成图片）、部分文本转语音（TTS）工具。

**多模态模型流程（Command Line Interface 风格）**：
```
MonaLisa@monasmachine my-repo $ copilot
╭────────────────────────────────────────────────────────╮
   ██████  ██      ████              ┌─────────┐           
   ██      ██       ██               │ ◠   ◠    │
   ██      ██       ██               │   ——   │
   ██      ██       ██               └─────────┘
   ██████  ██████  ████              Hello World
╰────────────────────────────────────────────────────────╯
~/your-project

Type @ to mention files, / for commands, or ? for shortcuts
shift+tab switch mode
╰────────────────────────────────────────────────────────╯
[HOME] ~/my-repo
> Type @ to mention files, / for commands, or ? for shortcuts
  shift+tab switch mode
> multimodal run --input image.jpg --task caption
────────────────────────────────────────────────────────
[LOAD]     image.jpg
[ENCODE]   image -> visual tokens
[MERGE]    visual tokens + text prompt
[PROCESS]  Transformer / multimodal encoder
[GENERATE] "这是一只橘色的小猫，正趴在沙发上"
────────────────────────────────────────────────────────
[STATUS]   completed
```
- 说明：多模态模型先把不同输入转成统一语义表示，再输出文本、图像或音频结果。

## 三、智能延伸：AI的“手脚与能力”

<a id="agent"></a>
### 4. Agent（智能体）

**核心定义**：基于大模型开发的“智能执行者”，具备自主感知、规划、行动、反思的能力，相当于给大模型装上“手脚”，能主动完成复杂任务，而不是被动等待指令。

**核心能力（区别于普通大模型）**：
- 自主规划：能将复杂任务拆解成小步骤，并根据执行结果动态调整计划。
- 工具调用：能主动调用外部工具（搜索引擎、日历、邮件、代码编辑器等），解决大模型“静态知识”“不会执行操作”的限制。
- 记忆与反思：能记住对话历史和任务状态，出错后会自主调整方案。

**参考链接**：
- [LangChain Agents](https://python.langchain.com/en/latest/modules/agents/getting_started.html)
- [Auto-GPT](https://github.com/Significant-Gravitas/Auto-GPT)

**通俗类比**：如果大模型是“只会思考的大脑”，Agent就是“会思考+会干活的机器人”，能自己规划、自己动手，帮你搞定各种繁琐的事情。

**Agent 工作流程（Command Line Interface 风格）**：
```
MonaLisa@monasmachine my-repo $ copilot
╭────────────────────────────────────────────────────────╮
   ██████  ██      ████              ┌─────────┐           
   ██      ██       ██               │ ●   ●    │
   ██      ██       ██               │   ——   │
   ██      ██       ██               └─────────┘
   ██████  ██████  ████              Hello World
╰────────────────────────────────────────────────────────╯
~/your-project

Type @ to mention files, / for commands, or ? for shortcuts
shift+tab switch mode
╰────────────────────────────────────────────────────────╯
[HOME] ~/my-repo
> Type @ to mention files, / for commands, or ? for shortcuts
  shift+tab switch mode
> agent run --task "订机票+订酒店"
────────────────────────────────────────────────────────
[PARSE]    parse user request
[PLAN]     generate execution steps
[CALL]     tool: flight_search
[CALL]     tool: hotel_search
[EXEC]     execute booking flow
[CHECK]    verify results
[ADJUST]   retry or suggest alternatives
────────────────────────────────────────────────────────
[STATUS]   completed
```
- 说明：Agent 会主动执行并根据结果动态优化方案。
<a id="skill"></a>
### 5. Skill（技能）

**核心定义**：Agent能执行的“单个具体能力”，相当于Agent的“工具箱里的工具”，每个Skill对应一个具体的任务，多个Skill组合起来，就能完成复杂任务。

**常见实例**：

- 基础技能：查天气、发邮件、设置提醒、翻译文本、搜索信息。

- 专业技能：写代码、做数据分析、生成PPT、修图、剪辑视频。

**关联说明**：Agent的能力强弱，取决于它拥有的Skill数量和质量，比如一个“办公Agent”，需要具备“写文案”“做表格”“发邮件”等多个Skill，才能帮你高效完成办公任务。

**Agent 与 Skill 关系（Command Line Interface 风格）**：
```
MonaLisa@monasmachine my-repo $ copilot
╭────────────────────────────────────────────────────────╮
   ██████  ██      ████              ┌─────────┐           
   ██      ██       ██               │ ◠   ◠    │
   ██      ██       ██               │   ——   │
   ██      ██       ██               └─────────┘
   ██████  ██████  ████              Hello World
╰────────────────────────────────────────────────────────╯
~/your-project

Type @ to mention files, / for commands, or ? for shortcuts
shift+tab switch mode
╰────────────────────────────────────────────────────────╯
[HOME] ~/my-repo
> Type @ to mention files, / for commands, or ? for shortcuts
  shift+tab switch mode
> agent status
────────────────────────────────────────────────────────
[AGENT]   active
[SKILL]   weather_check   ✓
[SKILL]   email_send      ✓
[SKILL]   content_write   ✓
[SKILL]   data_analysis   ✓
[NOTES]   all skills ready
────────────────────────────────────────────────────────
[STATUS]   nominal
```
- 说明：Agent 通过调用不同 Skill 模块完成完整任务。
<a id="tool-calling"></a>
### 6. Tool Calling（工具调用）

**核心定义**：Agent的核心能力之一，指Agent能主动识别任务需求，调用外部工具（API、搜索引擎、软件等），弥补大模型的不足，完成仅靠大模型无法完成的任务。

**通俗类比**：就像人遇到不会的问题会查字典、用计算器，Agent遇到“实时查天气”“算复杂数学题”“查最新新闻”等问题时，会调用对应的工具来解决。

**实例场景**：你让Agent“帮我查一下今天北京的天气，然后提醒我要不要带伞”，Agent会先调用“天气API”查天气，再根据天气情况，调用“日历提醒”工具给你发提醒。

## 四、辅助工具：操控与优化AI的“手段”
<a id="cli"></a>
### 7. CLI（Command Line Interface，命令行界面）

**核心定义**：一种通过输入文字命令来操控计算机、AI模型、Agent的界面，没有图形化界面（黑底白字），是开发者常用的“操控工具”。

**在AI中的用途**：

- 启动和停止AI模型、Agent的运行。

- 运行模型训练脚本，调整训练参数。

- 调用AI的API接口，实现批量操作。

**通俗类比**：如果图形化界面（比如手机APP）是“用鼠标、手指点一点就能操作”，CLI就是“用文字指令指挥”，虽然看起来复杂，但效率更高，适合专业人士使用。

**CLI 示例图**：
```
MonaLisa@monasmachine my-repo $ copilot
╭────────────────────────────────────────────────────────╮
   ██████  ██      ████              ┌─────────┐           
   ██      ██       ██               │ ◡   ◡    │
   ██      ██       ██               │   ——   │
   ██      ██       ██               └─────────┘
   ██████  ██████  ████              Hello World
╰────────────────────────────────────────────────────────╯
~/your-project

Type @ to mention files, / for commands, or ? for shortcuts
shift+tab switch mode
╰────────────────────────────────────────────────────────╯
[HOME] ~/my-repo
> Type @ to mention files, / for commands, or ? for shortcuts
  shift+tab switch mode
```
- 说明：CLI 是一种“文本指令界面”，适合开发者快速控制模型和任务。

<a id="mcp"></a>
### 8. MCP（多含义缩写，AI领域常用）

**核心定义**：AI领域没有固定统一的含义，常见有3种，根据场景判断：

- Model Control Plane（模型控制平面）：相当于“AI模型的总指挥中心”，负责管理多个AI模型，实现模型调度、负载均衡、故障排查，比如同时运行多个大模型，MCP负责分配任务，避免某个模型过载。

- Multi\-modal Chat / Processing（多模态聊天/处理）：指能处理文本、图片、音频等多种信息的聊天或处理系统，和“多模态模型”含义相近，但更侧重“系统层面”。

- Model Context Protocol（模型上下文协议）：不同项目自定义的缩写，主要用于模型之间的通信，确保多个模型能协同工作，传递上下文信息。

**通俗类比**：如果把多个AI模型比作“多个工人”，MCP（模型控制平面）就是“工头”，负责分配任务、协调工作，让多个工人高效配合。

<a id="prompt"></a>
### 9. Prompt（提示词）

**核心定义**：用户给AI的“指令”，是AI理解用户需求、生成对应输出的关键，相当于“和AI沟通的语言”。

**核心要点**：

- 提示词越具体，AI的输出越精准，比如“写一篇文案”不如“写一篇300字的奶茶文案，风格活泼，突出‘低糖、果香’特点”。

- 可包含“角色设定”，比如“你是一名专业的美食博主，写一篇推荐火锅的文案”，AI会按照设定的角色输出内容。

**实例对比**：

- 模糊提示：写一篇旅行文案。

- 精准提示：写一篇500字的青岛旅行文案，重点推荐海边景点，风格治愈，适合发朋友圈，包含“海风”“啤酒”“落日”三个关键词。

<a id="fine-tuning"></a>
### 10. Fine-tuning（微调）

**核心定义**：在大模型的基础上，用特定领域的数据再训练模型，让模型更贴合具体场景、更专业，相当于“给大模型‘补课’”。

**核心用途**：

- 行业适配：比如用医疗数据微调大模型，让它能回答医疗相关问题，成为“医疗AI”；用法律数据微调，成为“法律AI”。

- 个性化适配：比如用公司内部数据微调，让模型能生成符合公司风格的文案、报告。

**通俗类比**：大模型就像一个“全能学霸”，微调就相当于让它“专攻某一门学科”，比如专攻医学、法律，成为这一领域的“专家”。

<a id="rag"></a>
### 11. RAG（Retrieval-Augmented Generation，检索增强生成）

**核心定义**：给大模型“外挂一个知识库”，让AI在回答问题前，先从知识库中检索相关信息，再结合自身知识生成回答，避免“胡说八道”（幻觉）。

**核心优势**：

- 解决大模型“知识滞后”的问题：大模型的训练数据有时间限制，无法获取最新信息，RAG可以实时检索最新数据（比如新闻、政策）。

- 提升回答的准确性：避免AI编造不存在的信息，比如问“2026年最新房贷政策”，RAG会先检索最新政策，再生成回答。

**RAG 工作流程（Command Line Interface 风格）**：
```
MonaLisa@monasmachine my-repo $ copilot
╭────────────────────────────────────────────────────────╮
   ██████  ██      ████              ┌─────────┐           
   ██      ██       ██               │ ●   ●    │
   ██      ██       ██               │   ——   │
   ██      ██       ██               └─────────┘
   ██████  ██████  ████              Hello World
╰────────────────────────────────────────────────────────╯
~/your-project

Type @ to mention files, / for commands, or ? for shortcuts
shift+tab switch mode
╰────────────────────────────────────────────────────────╯
[HOME] ~/my-repo
> Type @ to mention files, / for commands, or ? for shortcuts
  shift+tab switch mode
> rag query "2026年最新房贷政策"
────────────────────────────────────────────────────────
[SEARCH]    检索知识库
[FOUND]     相关文档 5 条
[COMBINE]   文档内容 + 模型上下文
[GENERATE]  生成回答
[OUTPUT]    提供准确结果
────────────────────────────────────────────────────────
[STATUS]    completed
```
- 说明：RAG 通过“先检索再生成”减少模型出现错误信息的概率。

<a id="harness-engineering"></a>
### 12. Harness Engineering（驾驭工程）

**核心定义**：直译为“驾驭工程”，是AI行业新型工程化范式，核心是为AI智能体（Agent）构建一套完整的运行环境、约束规则与反馈闭环，不侧重提升模型本身性能，而是通过优化“驾驭模型的系统环境”，让AI可靠、自主地完成复杂工作，弥补通用大模型在真实场景中的泛化性不足。

**核心特点**：
- 工程化防错：核心逻辑是“每当AI犯错，就用工程化方案让它永远不再犯同样的错”，通过闭环设计减少AI幻觉和误操作。
- 环境赋能：构建受控、可靠的运行环境（如安全沙箱），抑制AI幻觉、保护数据隐私，同时适配私人文档、企业流程等个性化场景。
- 协同增效：整合工具调用、长记忆管理、工作流设计等系统工程手段，让大模型、Agent、Skill等组件协同工作，最大化发挥AI能力。
- 落地导向：核心价值是解决AI落地难题，当主流大模型的推理能力差距逐渐缩小，其设计水平直接决定AI落地的实际效果。

**通俗类比**：把大模型比作一匹难以掌控的“野马”，Harness Engineering就是一套精良的“马具”——缰绳是Prompt Engineering，马鞍是RAG插件，马镫是闭环沙盒环境，有了这套“马具”，才能将“野马”转化为稳定输出、适配场景的“赛马”。

**关联说明**：与Agent相辅相成，是Agent稳定工作的核心支撑，为Agent提供工具服务器、执行沙箱、API层等全链路环境；与MCP侧重多模型调度不同，它更专注于Agent运行环境的搭建与优化，共同助力AI落地。

**常见实例**：火山引擎Arkclaw、百度DuMate、腾讯ClawPro等产品，均通过Harness Engineering构建安全沙箱、优化工具链，让AI能自主完成跨应用、跨文件的复杂任务。

**Harness Engineering 逻辑（Command Line Interface 风格）**：
```
MonaLisa@monasmachine my-repo $ copilot
╭────────────────────────────────────────────────────────╮
   ██████  ██      ████              ┌─────────┐           
   ██      ██       ██               │ ◡   ◡    │
   ██      ██       ██               │   ——   │
   ██      ██       ██               └─────────┘
   ██████  ██████  ████              Hello World
╰────────────────────────────────────────────────────────╯
~/your-project

Type @ to mention files, / for commands, or ? for shortcuts
shift+tab switch mode
╰────────────────────────────────────────────────────────╯
[HOME] ~/my-repo
> Type @ to mention files, / for commands, or ? for shortcuts
  shift+tab switch mode
> harness status
────────────────────────────────────────────────────────
[MODEL]     GPT-4v running
[ENV]       sandbox mode enabled
[TOOL]      control active
[CHECK]     output safety validated
[FEEDBACK]  issue detected
[OPTIMIZE]  strategy updated
────────────────────────────────────────────────────────
[STATUS]    operational
```
- 说明：Harness Engineering 是“给 AI 装上马具”，让它更可靠、更可控。

## 五、补充名词：AI入门必知的“小知识点”

- **Embedding（向量嵌入）**：把文字、图片等信息转换成机器能理解的“数字向量”，相当于给AI的“语言翻译器”，让机器能识别语义、区分不同信息的差异。比如“猫”和“狗”的向量会有明显区别，机器能通过向量判断两者的不同。

- **Token（令牌）**：AI理解和处理文本的“最小单位”，不是单个汉字或单词，比如“我爱AI”可能被拆分成“我”“爱”“AI”三个Token，大模型的“上下文窗口”就是指能处理的Token数量（数量越多，能记住的内容越长）。

- **API（应用程序接口）**：不同软件、AI模型之间的“通信桥梁”，比如你在手机APP上用AI生成文案，APP就是通过API调用AI模型的能力，实现“输入需求 → 生成文案”的功能。

- **LoRA（低秩适配）**：一种轻量级微调方式，比传统Fine\-tuning训练更快、占用显存更小，适合普通开发者对大模型进行微调，不用花费大量的时间和算力。

- **Context Window（上下文窗口）**：AI能记住的“对话/文本长度”，窗口越大，AI能记住的内容越多，比如上下文窗口为1000Token，AI能记住你之前1000个Token的对话内容，避免“转头就忘”。

<a id="ai名词关系"></a>
## 六、核心关系梳理：一张图看懂所有名词关联

很多人看完单个名词还是会懵，其实这些名词之间有清晰的层级关系，用一句话就能串起来：

**Transformer（底层架构）→ 搭建出大模型/多模态模型（核心大脑）→ 大模型驱动Agent（智能执行者）→ Agent依靠Skill（技能）和Tool Calling（工具调用）完成任务 → 用CLI/API/MCP（操控工具）进行调度和运行****，****通过Prompt（提示词）、Fine\-tuning（微调）、RAG（检索增强）****、Harness Engineering（驾驭工程）****优化AI的表现**

**AI 名词关系总览（Command Line Interface 风格）**：
```
MonaLisa@monasmachine my-repo $ copilot
╭────────────────────────────────────────────────────────╮
   ██████  ██      ████              ┌─────────┐           
   ██      ██       ██               │ ◠   ◠    │
   ██      ██       ██               │   ——   │
   ██      ██       ██               └─────────┘
   ██████  ██████  ████              Hello World
╰────────────────────────────────────────────────────────╯
~/your-project

Type @ to mention files, / for commands, or ? for shortcuts
shift+tab switch mode
╰────────────────────────────────────────────────────────╯
[HOME] ~/my-repo
> Type @ to mention files, / for commands, or ? for shortcuts
  shift+tab switch mode
> topo
────────────────────────────────────────────────────────
[AI TOPOLOGY]
  Transformer -> 大模型 / 多模态模型 -> Agent
  Agent -> Skill / Tool Calling
  Agent -> CLI / API / MCP
  Agent -> Prompt / Fine-tuning / RAG / Harness Engineering
────────────────────────────────────────────────────────
[STATUS]   overview complete
```
- 说明：这张结构图把文章中的核心名词按层级关系串联起来，帮助读者从宏观上把握 AI 体系。

## 附加图示与参考链接

以下链接可直接帮助你对照图示和权威解释，更快理解文章内容：

- Transformer 结构图： [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- Transformer 原始论文： [Attention is All You Need](https://arxiv.org/abs/1706.03762)
- Agent 工作流程： [LangChain Agents](https://python.langchain.com/en/latest/modules/agents/getting_started.html)
- RAG 机制图： [Pinecone RAG 介绍](https://www.pinecone.io/learn/rag/)
- 多模态系统： [GPT-4V 介绍](https://openai.com/research/gpt-4v)
- Prompt 设计： [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)

> 建议在阅读本篇时，配合上述图示页面浏览，可以直观感受Transformer、Agent、RAG等概念的体系结构和流程。

## 七、总结：小白入门避坑指南

1\. 不用死记硬背，重点理解“层级关系”：Transformer是地基，大模型是核心，Agent是延伸，其他名词都是“辅助工具”或“补充知识点”。

2\. 遇到不懂的名词，先看它属于“底层架构”“核心模型”“智能延伸”还是“辅助工具”，再结合类比理解，不用纠结专业术语。

3\. 实践是最好的学习方式：用AI写一段文案、让Agent帮你订个提醒，在使用中理解这些名词的实际用途，比单纯看理论更高效。

看完这篇博客，相信你已经能轻松分辨AI圈的各种名词，再也不会被“Transformer”“Agent”这些词汇劝退啦～ 后续如果遇到新的AI名词，也可以回头看看这篇，帮你快速定位和理解！
