# 心智桥工作室 2026 秋季招新交互站

## 运行

```bash
pnpm i
pnpm dev
```

生产构建：`pnpm build`，本地预览：`pnpm preview`。

## 内容与素材

- 全部结构化文案：`src/content/site.ts`
- 报名二维码：`public/qr.png`
- 油画背景素材：`public/art/`（7 张，按页面叙事顺序编号）
- Favicon：`public/favicon.svg`
- 招新状态与截止日期：`src/content/site.ts` 顶部的 `IS_OPEN` 和 `RECRUIT_DEADLINE`

当前 `IS_OPEN = false`，因为任务书给出的截止时间 `2026.10.19 24:00` 已过。确认新一轮招新信息后再更新截止日期，并将该值改为 `true`。

## 事实边界

“晴屿”仅是命题 04 的虚构素材，页面在对应展开区明确标注，未将其作为工作室真实项目宣传。未确认的报名链接和答疑信息保持“待补充”。

## 视觉背景

全站采用暖纸白、植物绿与柔和花瓣橙的明亮配色。桌面端使用 Three.js 将 7 张油画放置在景深空间中，随页面滚动推进并接受轻微鼠标视差；浅色渐层统一图像色调并保持文字可读。WebGL 加载失败时会自动显示 CSS 静态背景；移动端限制像素密度和动态幅度，系统开启“减少动态效果”时只渲染静态帧。

## GitHub 协作

仓库不应提交 `node_modules/`、`dist/` 或 TypeScript 增量缓存。克隆仓库后运行 `pnpm install` 安装依赖，再运行 `pnpm dev` 启动开发站点。内容更新请优先修改 `src/content/site.ts`，视觉样式位于 `src/styles/`。
