import TitleHeader from "../../components/TitleHeader";
import { useNavigate } from 'react-router';

export default function Survey() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/new-features/learning-path-recommendation');
  };

  return (
    <div className="flex flex-col w-full max-h-fit overflow-y-scroll">
      <TitleHeader title="Survey" />
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="question1" 
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Enter your skill
                </label>
                <input
                  type="text"
                  id="userSkill"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-base focus:border-theme-base"
                  placeholder="e.g., Machine Learning"
                  required
                />
              </div>

              <div>
                <label 
                  htmlFor="question2" 
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Enter your preferred programming language
                </label>
                <input
                  type="text"
                  id="programmingLanguage"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-base focus:border-theme-base"
                  placeholder="e.g., Python"
                  required
                />
              </div>

              <div>
                <label 
                  htmlFor="question3" 
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Enter your Github username
                </label>
                <input
                  type="text"
                  id="github"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-base focus:border-theme-base"
                  placeholder="e.g., jhondoe223"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-theme-base text-white py-2 px-4 rounded-md hover:bg-theme-base/90 transition-colors font-medium"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
