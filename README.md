# iLEAD 2026: THE MAGIC AWAKENS - iSupport Club VNU-IS

Official booklet web application for **iLEAD 2026: Leadership Awakening Competition**, organized by **iSupport Club** under the Youth Union of VNU International School - Vietnam National University, Hanoi (VNU-IS).

The application features a Harry Potter wizarding aesthetic inspired by the official Harry Potter website, presenting club information, event showcases, leadership board, department spotlight, sorting hat quiz, and competition registration.

---

## Language Support / Ngôn ngữ

- [English Documentation](#english-documentation)
- [Tài liệu Tiếng Việt](#tai-lieu-tieng-viet)

---

<a name="english-documentation"></a>
## English Documentation

### Overview

iLEAD 2026 - The Magic Awakens is a student leadership development project that invites participants to unlock their hidden potential. This web application serves as an interactive booklet and registration gateway for students.

### Features

- **Wizarding Aesthetics**: Custom deep purple theme, gold accents, medieval typography, glowing borders, and particle background.
- **Desktop-First Layout**: Optimized for desktop viewing experience with responsive elements.
- **Interactive Event Showcase**: Highlights past iSupport events (2024-2026) including iLEAD, iWit, ISPEAK, TEDxVNUIS, and FDB Talent.
- **The Wizarding Council**: Showcase of executive board members with carousel interaction.
- **House Responsibilities**: Department spotlight detailing Gryffindor (Communications), Ravenclaw (R&D), Slytherin (External Relations), and Hufflepuff (Internal Affairs & Logistics).
- **Sorting Hat Quiz**: Interactive quiz to determine house assignment based on leadership traits.
- **Platform 9¾ Registration**: Simple registration form for participants with instant ticket confirmation.
- **Hogwarts Owl Assistant (Chatbot)**: Floating magical chat widget powered by OpenAI (`gpt-4o-mini`) and an intelligent local knowledge fallback engine, providing bilingual Q&A about iSupport Club, iLEAD 2026, 4 houses/departments, executive board, and registration.

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with CSS Custom Properties
- **Deployment**: Vercel ready

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Logm12/booklet.git
   cd booklet
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

<a name="tai-lieu-tieng-viet"></a>
## Tài liệu Tiếng Việt

### Tổng quan

iLEAD 2026 - The Magic Awakens là cuộc thi khai phá năng lực lãnh đạo dành cho sinh viên, được tổ chức bởi CLB Hỗ trợ Học tập và Phát triển Kỹ năng Mềm (iSupport) trực thuộc Đoàn Thanh niên Trường Quốc tế - ĐHQGHN (VNU-IS).

Trang web đóng vai trò như một booklet điện tử kết hợp cổng đăng ký trực tuyến mang phong cách phép thuật Harry Potter.

### Các tính năng chính

- **Thiết kế phong cách Harry Potter**: Tông màu tím đậm, viền vàng kim metallic, font chữ mang âm hưởng cổ điển và hiệu ứng hạt phát sáng.
- **Giao diện tối ưu cho máy tính (Desktop-First)**: Đảm bảo trải nghiệm trực quan và mượt mà trên màn hình máy tính.
- **Giới thiệu sự kiện nổi bật**: Tổng hợp các hoạt động nổi bật từ 2024 đến 2026 của iSupport như iLEAD, iWit, ISPEAK, TEDxVNUIS, ISTARTUP, VBCC và FDB Talent.
- **Ban Chủ Nhiệm (The Wizarding Council)**: Giới thiệu đội ngũ lãnh đạo CLB.
- **Phân công nhiệm vụ theo Nhà (House Responsibilities)**: Chi tiết 4 ban chuyên môn tương ứng với 4 nhà Gryffindor (Truyền thông), Ravenclaw (Nghiên cứu & Phát triển), Slytherin (Đối ngoại), và Hufflepuff (Nội vụ & Hậu cần).
- **Trắc nghiệm Sorting Hat Quiz**: Bài kiểm tra phân nhà tự động theo phong cách Hogwarts.
- **Đăng ký tham gia Platform 9¾**: Biểu mẫu đăng ký tham gia chương trình nhanh chóng.
- **Trợ Lý Cú iSupport (Hogwarts Owl Assistant Chatbot)**: Widget trò chuyện nổi với trí tuệ nhân tạo OpenAI kết hợp chế độ dự phòng thông minh (Fallback Engine), giải đáp mọi câu hỏi về iSupport, iLEAD 2026, 4 Nhà chuyên môn, Ban Chủ Nhiệm và cách thức đăng ký (hỗ trợ song ngữ Việt - Anh).

### Cấu hình biến môi trường (Environment Variables)

Sao chép file `.env.example` thành `.env.local` và điền các khóa cần thiết:
```bash
cp .env.example .env.local
```

- `OPENAI_API_KEY`: Khóa OpenAI API Key để kích hoạt trả lời thông minh bằng GPT (`gpt-4o-mini`). *(Lưu ý: Nếu chưa cấu hình hoặc không có mạng, chatbot sẽ tự động chuyển sang chế độ Dự phòng Thông minh dựa trên bộ tri thức iSupport có sẵn mà không bao giờ bị lỗi crash!)*
- `OPENAI_MODEL`: Model OpenAI muốn sử dụng (mặc định: `gpt-4o-mini`).

### Công nghệ sử dụng

- **Framework**: Next.js 14 (App Router)
- **Ngôn ngữ**: TypeScript
- **AI & Chatbot**: OpenAI API (`gpt-4o-mini`) + Local Knowledge Engine
- **Style**: CSS thuần kết hợp CSS Variables
- **Triển khai**: Tối ưu sẵn cho Vercel Deployment

### Hướng dẫn cài đặt và chạy ứng dụng

1. **Tải repository về máy**:
   ```bash
   git clone https://github.com/Logm12/booklet.git
   cd booklet
   ```

2. **Cài đặt thư viện phụ thuộc**:
   ```bash
   npm install
   ```

3. **Chạy giao diện thử nghiệm**:
   ```bash
   npm run dev
   ```

4. **Đóng gói phiên bản chính thức**:
   ```bash
   npm run build
   ```

---

## Project Structure / Cấu trúc thư mục

```
booklet/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # OpenAI & Fallback API Route
│   ├── globals.css             # HP Theme CSS Tokens & Chatbot Styles
│   ├── layout.tsx              # Root Layout & Metadata
│   └── page.tsx                # Main Booklet Landing Page
├── components/
│   ├── ChatWidget.tsx          # Hogwarts Owl Assistant Chat Floating Widget
│   ├── Footer.tsx              # Footer component
│   ├── Navbar.tsx              # Header Navigation
│   ├── QRCodePlaceholder.tsx   # QR Code & Google Form Handler
│   ├── QuizModal.tsx           # Sorting Hat Quiz Modal
│   └── SparkleEffect.tsx       # Background Magic Particles
├── lib/
│   ├── chatbot-knowledge.ts    # Persona, Knowledge Base & Fallback Engine
│   ├── config.ts               # App Config & Environment URLs
│   ├── i18n.ts                 # Bilingual EN/VI Translations
│   └── quiz-data.ts            # Quiz Questions & House Traits Data
├── public/
│   └── assets/                 # Images & Logos
├── .env.example                # Example environment configuration
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

---

## License / Bản quyền

Distributed under the MIT License. Copyright belong to iSupport Club - VNU International School (VNU-IS).