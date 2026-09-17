import { HouseKey } from './quiz-data';

export interface DeptSubsection {
  subHeading?: string; // tên tiểu ban, chỉ ghi 1 lần (bỏ qua nếu ban không có tiểu ban)
  workLabel: string; // "Mô tả công việc" hoặc "Công việc cụ thể"
  workItems: string[];
  reqLabel: string; // "Yêu cầu"
  reqItems: string[];
}

export interface DeptContent {
  cardTitle: string; // format: "Ban [Tên] - [Nhà]"
  image: string; // đường dẫn ảnh huy hiệu Nhà tương ứng
  sections: DeptSubsection[];
}

// Nội dung JD chi tiết — bản chỉnh sửa mới nhất, mỗi tiểu ban chỉ ghi tên 1 lần.
export const DEPARTMENT_CONTENT: Record<HouseKey, DeptContent> = {
  gryffindor: {
    cardTitle: 'Ban Truyền Thông - Gryffindor',
    image: '/assets/img/dept-gryffindor-marcom.webp',
    sections: [
      {
        subHeading: 'Tiểu ban Content',
        workLabel: 'Mô tả công việc',
        workItems: [
          'Xây dựng và quản lý ý tưởng, nội dung bài đăng trên các kênh truyền thông của iSupport (Fanpage, website, Instagram, etc.).',
          'Lên kế hoạch truyền thông - marketing, kế hoạch seeding và hỗ trợ seeding cho các bài đăng các sự kiện của iSupport.',
        ],
        reqLabel: 'Yêu cầu',
        reqItems: [
          'Có niềm đam mê về sáng tạo nội dung, nắm bắt xu hướng trên mạng xã hội.',
          'Năng động, hoạt bát, sáng tạo, chủ động trong công việc và đặc biệt tinh thần trách nhiệm cao, đúng hẹn, đúng deadline.',
          'Có khả năng viết tốt, truyền đạt ý mạch lạc, trôi chảy, sáng tạo trong phong cách viết bài là một lợi thế.',
          'Thành thạo các nền tảng truyền thông xã hội (Facebook, TikTok…).',
        ],
      },
      {
        subHeading: 'Tiểu ban Media - Design',
        workLabel: 'Mô tả công việc',
        workItems: [
          'Thiết kế các ấn phẩm truyền thông (ảnh, bài đăng, video, poster…) cho các dự án của iSupport.',
          'Chụp ảnh truyền thông tại các sự kiện của CLB.',
          'Kết hợp với tiểu ban content để tạo ra những bài đăng phù hợp trên page.',
        ],
        reqLabel: 'Yêu cầu',
        reqItems: [
          'Có khả năng sáng tạo và thiết kế từ những ý tưởng gốc.',
          'Có khả năng sử dụng các phần mềm thiết kế (Illustrator, Photoshop, Canva, etc.).',
          'Sáng tạo, chủ động trong công việc và đặc biệt tinh thần trách nhiệm cao, đúng giờ, đúng deadline.',
          'Sẵn sàng học hỏi.',
          'Biết chụp ảnh, quay và dựng video là điểm cộng.',
        ],
      },
    ],
  },

  ravenclaw: {
    cardTitle: 'Ban Nội Dung - Ravenclaw',
    image: '/assets/img/dept-ravenclaw-rd.webp',
    sections: [
      {
        workLabel: 'Mô tả công việc',
        workItems: [
          'Nghiên cứu nhu cầu, xu hướng và các chủ đề phù hợp với sinh viên.',
          'Brainstorming, đề xuất ý tưởng và xây dựng concept/chủ đề cho chương trình.',
          'Khảo sát đối tượng tham gia để xác định định hướng nội dung phù hợp.',
          'Xây dựng proposal, agenda, timeline và kế hoạch nội dung.',
          'Nghiên cứu, tìm kiếm và đề xuất diễn giả/khách mời phù hợp.',
          'Xây dựng kịch bản chương trình, kịch bản MC và các tài liệu nội dung liên quan.',
          'Phối hợp với diễn giả/khách mời và các ban liên quan trong quá trình triển khai.',
          'Theo dõi tiến độ, điều chỉnh nội dung và tham gia điều phối trong sự kiện.',
          'Thu thập phản hồi, đánh giá hiệu quả và đề xuất cải tiến cho các chương trình tiếp theo.',
        ],
        reqLabel: 'Yêu cầu',
        reqItems: [
          'Có tư duy sáng tạo, logic, chủ động và khả năng phát triển ý tưởng.',
          'Có tinh thần học hỏi, trách nhiệm và chủ động tiếp nhận, cải thiện theo phản hồi.',
          'Có khả năng tìm kiếm, chọn lọc và xử lý thông tin.',
          'Quan tâm đến các vấn đề, xu hướng và chủ đề trong môi trường sinh viên.',
          'Có tinh thần teamwork, sẵn sàng chia sẻ ý tưởng và phối hợp với các thành viên.',
          'Chủ động, linh hoạt, chuyên nghiệp và có khả năng quản lý thời gian.',
        ],
      },
    ],
  },

  slytherin: {
    cardTitle: 'Ban Đối Ngoại - Slytherin',
    image: '/assets/img/dept-slytherin-er.webp',
    sections: [
      {
        workLabel: 'Mô tả công việc',
        workItems: [
          'Sử dụng email trong liên hệ, trao đổi thông tin với thầy cô, các bạn sinh viên và các tổ chức bên ngoài.',
          'Tìm kiếm, liên hệ hợp tác với các nhà tài trợ, diễn giả, giám khảo, đơn vị báo chí, đơn vị hợp tác truyền thông của các dự án trong iSupport.',
          'Lên nội dung, chuẩn bị hồ sơ tài trợ và các tài liệu liên quan.',
          'Liên hệ với các tổ chức, công ty để xin hỗ trợ về tài chính, địa điểm, chuyên môn.',
          'Chịu trách nhiệm làm việc trực tiếp, đảm bảo quyền lợi và giữ quan hệ với các đối tác của iSupport và các thầy cô trong Trường Quốc tế - Đại học Quốc Gia Hà Nội.',
        ],
        reqLabel: 'Yêu cầu',
        reqItems: [
          'Tinh thần, trách nhiệm cao, đúng hẹn, đúng deadline, tác phong làm việc nghiêm túc.',
          'Chăm chỉ, biết lắng nghe đồng thời biết đưa ra ý kiến cá nhân.',
          'Tự tin, có khả năng giao tiếp tốt, ăn nói lưu loát, trình bày vấn đề một cách rõ ràng.',
          'Khả năng xử lý, sắp xếp công việc và thông tin hiệu quả.',
          'Có khả năng đàm phán, thuyết phục là một lợi thế.',
          'Biết cách viết đơn, viết mail xin tài trợ là một lợi thế.',
        ],
      },
    ],
  },

  hufflepuff: {
    cardTitle: 'Ban Đối Nội & Hậu Cần - Hufflepuff',
    image: '/assets/img/dept-hufflepuff-inlog.webp',
    sections: [
      {
        subHeading: 'Tiểu ban Đối Nội',
        workLabel: 'Công việc cụ thể',
        workItems: [
          'Tổ chức các hoạt động nội bộ CLB: teambuilding, bonding, liên hoan, họp mặt và các hoạt động chung.',
          'Theo dõi mức độ cam kết, lắng nghe feedback và hỗ trợ, đề xuất giải pháp phát triển nhân sự.',
          'Lọc thành viên theo kỳ học và tổng hợp feedback của thành viên tới CLB.',
          'Viết biên bản các cuộc họp nội bộ.',
          'Cập nhật thành tích và các sự kiện quan trọng của thành viên.',
          'Hỗ trợ các ban khác trong hoạt động của CLB.',
        ],
        reqLabel: 'Yêu cầu',
        reqItems: [
          'Nhiệt tình, năng động, hòa đồng và có trách nhiệm.',
          'Có khả năng lắng nghe, thấu hiểu, chia sẻ và gắn kết mọi người.',
          'Có thể sắp xếp thời gian tham gia các buổi họp và sự kiện của CLB.',
        ],
      },
      {
        subHeading: 'Tiểu ban Hậu cần – Sự kiện',
        workLabel: 'Công việc cụ thể',
        workItems: [
          'Phối hợp với Đối Nội tổ chức các hoạt động nội bộ CLB.',
          'Bố trí, theo dõi và điều phối nhân sự trong các sự kiện.',
          'Xây dựng dự trù kinh phí, khảo sát giá và mua sắm vật dụng cần thiết.',
          'Phụ trách hậu cần, in ấn, set-up và dọn dẹp không gian sự kiện.',
          'Xây dựng, thực hiện kịch bản sự kiện dưới sự điều phối của Ban Nội dung.',
        ],
        reqLabel: 'Yêu cầu',
        reqItems: [
          'Năng động, nhiệt tình, chăm chỉ, cẩn thận, nhanh nhẹn và có trách nhiệm.',
          'Biết quan sát, xử lý tình huống nhạy bén và có đầu óc sáng tạo.',
          'Có thể sắp xếp thời gian tham gia trực tiếp các buổi họp và sự kiện.',
        ],
      },
    ],
  },
};
