import { Language } from './i18n';

export type HouseKey = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

export interface QuizOption {
  text: {
    en: string;
    vi: string;
  };
  house: HouseKey;
}

export interface QuizQuestion {
  id: string;
  question: {
    en: string;
    vi: string;
  };
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: {
      en: 'Which quality do you value most in yourself?',
      vi: 'Phẩm chất nào bạn trân trọng và tự hào nhất ở bản thân?',
    },
    options: [
      {
        text: {
          en: 'Courage, bravery, and leadership in facing challenges',
          vi: 'Lòng dũng cảm, bản lĩnh tiên phong và sự quyết đoán',
        },
        house: 'gryffindor',
      },
      {
        text: {
          en: 'Ambition, strategic thinking, and drive for success',
          vi: 'Tầm nhìn chiến lược, tham vọng lớn và sự sắc bén',
        },
        house: 'slytherin',
      },
      {
        text: {
          en: 'Wisdom, analytical mind, and passion for innovation',
          vi: 'Sự trí tuệ, tư duy phản biện và tinh thần sáng tạo',
        },
        house: 'ravenclaw',
      },
      {
        text: {
          en: 'Loyalty, dedication, teamwork, and strong support',
          vi: 'Sự tận tụy, lòng trung thành và tính kết nối đồng đội',
        },
        house: 'hufflepuff',
      },
    ],
  },
  {
    id: 'q2',
    question: {
      en: 'How do you react when facing a major challenge in iSupport?',
      vi: 'Khi đối mặt với một thử thách lớn trong dự án iSupport, bạn sẽ làm gì?',
    },
    options: [
      {
        text: {
          en: 'Step up directly with energy and lead the team forward',
          vi: 'Xung phong dẫn đầu, truyền năng lượng và trực tiếp giải quyết',
        },
        house: 'gryffindor',
      },
      {
        text: {
          en: 'Formulate a strategic plan and negotiate key partnerships',
          vi: 'Lập chiến lược rõ ràng, tìm kiếm đối tác và tối ưu nguồn lực',
        },
        house: 'slytherin',
      },
      {
        text: {
          en: 'Analyze data thoroughly and research innovative solutions',
          vi: 'Nghiên cứu kỹ lưỡng, phân tích dữ liệu và tìm ra giải pháp tối ưu',
        },
        house: 'ravenclaw',
      },
      {
        text: {
          en: 'Organize operations patiently and support every member',
          vi: 'Lắng nghe, sắp xếp công việc chu đáo và hỗ trợ từng thành viên',
        },
        house: 'hufflepuff',
      },
    ],
  },
  {
    id: 'q3',
    question: {
      en: 'Which environment at Hogwarts feels most like home to you?',
      vi: 'Không gian nào ở Hogwarts mang lại cho bạn cảm giác thuộc về nhất?',
    },
    options: [
      {
        text: {
          en: 'The warm Common Room glowing beside the roaring fireplace',
          vi: 'Phòng sinh hoạt chung ấm cúng bên ánh lửa rực rỡ',
        },
        house: 'gryffindor',
      },
      {
        text: {
          en: 'The mysterious, elegant Dungeons beneath the Black Lake',
          vi: 'Căn phòng Hầm ngục sang trọng, bí ẩn dưới lòng Hồ Đen',
        },
        house: 'slytherin',
      },
      {
        text: {
          en: 'The highest Tower library filled with ancient wisdom',
          vi: 'Tháp cao rực rỡ với thư viện tri thức mênh mông',
        },
        house: 'ravenclaw',
      },
      {
        text: {
          en: 'The welcoming Kitchens near the sunlit gardens',
          vi: 'Khu vực bếp ấm áp, thân thiện gần khu vườn tràn ngập ánh nắng',
        },
        house: 'hufflepuff',
      },
    ],
  },
  {
    id: 'q4',
    question: {
      en: 'What is your primary goal in iLEAD 2026?',
      vi: 'Mục tiêu lớn nhất của bạn khi bước vào hành trình iLEAD 2026 là gì?',
    },
    options: [
      {
        text: {
          en: 'Inspire everyone with powerful, impactful presentations',
          vi: 'Bùng nổ truyền thông, truyền cảm hứng cho hàng ngàn sinh viên',
        },
        house: 'gryffindor',
      },
      {
        text: {
          en: 'Secure key sponsorships and lead the strategic vision',
          vi: 'Mang về các hợp đồng tài trợ lớn và hoạch định tầm nhìn lớn',
        },
        house: 'slytherin',
      },
      {
        text: {
          en: 'Develop breakthrough event concepts and MC scripts',
          vi: 'Sáng tạo những ý tưởng sự kiện độc đáo và kịch bản xuất sắc',
        },
        house: 'ravenclaw',
      },
      {
        text: {
          en: 'Ensure flawless logistics, financial budget, and team spirit',
          vi: 'Đảm bảo hậu cần chu đáo, tài chính minh bạch và tinh thần gắn kết',
        },
        house: 'hufflepuff',
      },
    ],
  },
];

export const HOUSE_INFO: Record<
  HouseKey,
  {
    name: {
      en: string;
      vi: string;
    };
    department: {
      en: string;
      vi: string;
    };
    traits: {
      en: string;
      vi: string;
    };
    badge: string;
    color: string;
    textColor: string;
  }
> = {
  gryffindor: {
    name: {
      en: 'Gryffindor',
      vi: 'Gryffindor',
    },
    department: {
      en: 'Communications Department',
      vi: 'Ban Truyền Thông',
    },
    traits: {
      en: 'Brave, pioneering, energetic, and always the center of attention.',
      vi: 'Dũng cảm, tiên phong, tràn đầy năng lượng và luôn tỏa sáng rực rỡ.',
    },
    badge: '/assets/img/gryffindor.webp',
    color: 'var(--gryffindor-red)',
    textColor: '#ffb3b5',
  },
  slytherin: {
    name: {
      en: 'Slytherin',
      vi: 'Slytherin',
    },
    department: {
      en: 'External Relations Department',
      vi: 'Ban Đối Ngoại',
    },
    traits: {
      en: 'Ambitious, strategic, persuasive, and excellent negotiators.',
      vi: 'Tham vọng, chiến lược, thuyết phục sắc bén và đàm phán tài tình.',
    },
    badge: '/assets/img/slytherin.webp',
    color: 'var(--slytherin-green)',
    textColor: '#a3e4b7',
  },
  ravenclaw: {
    name: {
      en: 'Ravenclaw',
      vi: 'Ravenclaw',
    },
    department: {
      en: 'Research & Development (R&D)',
      vi: 'Ban Nghiên Cứu & Phát Triển (R&D)',
    },
    traits: {
      en: 'Wise, analytical, and passionate about discovering new knowledge.',
      vi: 'Uyên bác, sắc bén, nhạy bén tư duy và đam mê khám phá tri thức mới.',
    },
    badge: '/assets/img/ravenclaw.webp',
    color: 'var(--ravenclaw-blue)',
    textColor: '#a5c4f2',
  },
  hufflepuff: {
    name: {
      en: 'Hufflepuff',
      vi: 'Hufflepuff',
    },
    department: {
      en: 'Internal Affairs & Logistics',
      vi: 'Ban Nội Vụ & Hậu Cần',
    },
    traits: {
      en: "Dedicated, thoughtful, dependable, and the club's strongest support system.",
      vi: 'Tận tụy, chu đáo, đáng tin cậy và là hậu phương vững chắc nhất của CLB.',
    },
    badge: '/assets/img/hufflepuff.webp',
    color: 'var(--hufflepuff-yellow)',
    textColor: '#fbe49d',
  },
};
