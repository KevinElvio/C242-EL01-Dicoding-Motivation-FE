import TitleHeader from "../../components/TitleHeader";

export default function LearningPathRecommendation() {
    const recommendations = [
        {
          id: 1,
          title: "Machine Learning Specialist",
          description: "Pelajari dasar-dasar machine learning, algoritma pembelajaran mesin, dan implementasinya menggunakan Python dan framework populer seperti TensorFlow dan PyTorch.",
        },
        {
          id: 2,
          title: "Data Science Path",
          description: "Kuasai analisis data, visualisasi, dan statistical learning untuk menjadi data scientist yang handal dengan Python dan R.",
        },
        {
          id: 3,
          title: "Web Development",
          description: "Pelajari pengembangan web modern dengan React, Node.js, dan teknologi full-stack lainnya untuk membangun aplikasi web yang dinamis.",
        },
        {
          id: 4,
          title: "Mobile App Development",
          description: "Kembangkan aplikasi mobile dengan React Native atau Flutter untuk iOS dan Android platforms.",
        },
        {
          id: 5,
          title: "Cloud Computing",
          description: "Pelajari AWS, Azure, atau Google Cloud Platform untuk mengembangkan dan men-deploy aplikasi berbasis cloud.",
        },
        {
          id: 6,
          title: "DevOps Engineer",
          description: "Kuasai tools dan praktik DevOps seperti Docker, Kubernetes, dan CI/CD untuk otomatisasi deployment.",
        },
        {
          id: 7,
          title: "Cybersecurity Specialist",
          description: "Pelajari keamanan jaringan, enkripsi, dan praktik keamanan terbaik untuk melindungi sistem dan data.",
        },
        {
          id: 8,
          title: "Backend Development",
          description: "Fokus pada pengembangan server-side dengan Node.js, Python, atau Java untuk membangun API dan services.",
        },
        {
          id: 9,
          title: "Frontend Development",
          description: "Kuasai HTML, CSS, JavaScript, dan framework modern seperti React untuk membangun antarmuka pengguna yang menarik.",
        },
        {
          id: 10,
          title: "Game Development",
          description: "Pelajari Unity atau Unreal Engine untuk mengembangkan game multi-platform yang menarik.",
        }
      ];
  return (
    <div className="flex flex-col w-full max-h-fit overflow-y-scroll">
      <TitleHeader title="Survey" />
      <div className="space-y-4 mx-6 mb-8">
          {recommendations.map((rec) => (
            <div 
              key={rec.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow flex justify-between items-center"
            >
              <div className="flex-1 pr-6">
                <h2 className="text-xl font-bold text-primary mb-2">
                  {rec.title}
                </h2>
                <p className="text-gray-600">
                  {rec.description}
                </p>
              </div>
              <button
                className="bg-button text-white py-2 px-6 rounded-md hover:bg-accent/90 transition-colors font-medium whitespace-nowrap h-fit"
                onClick={() => {
                  console.log(`Navigating to ${rec.title} course`);
                }}
              >
                Belajar
              </button>
            </div>
          ))}
        </div>
    </div>
  );
}