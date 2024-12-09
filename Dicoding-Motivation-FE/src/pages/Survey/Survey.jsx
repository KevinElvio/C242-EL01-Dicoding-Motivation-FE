import TitleHeader from "../../components/TitleHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios for API requests

export default function Survey() {
  const navigate = useNavigate();
  const [customSkill, setCustomSkill] = useState("");
  const [customLanguage, setCustomLanguage] = useState("");
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [customLanguageInput, setCustomLanguageInput] = useState("");
  const [githubUsername, setGithubUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skill = customSkill === "Other" ? customSkillInput : customSkill;
    const language = customLanguage === "Other" ? customLanguageInput : customLanguage;

    try {
      const response = await axios.post("http://127.0.0.1:5000/recommend", {
        skill,
        language,
        github_username: githubUsername,
      });

      // Assuming the response contains recommendations
      const recommendations = response.data.recommendations;
      navigate('/new-features/learning-path-recommendation', { state: { recommendations } });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
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
                  htmlFor="skill"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Select your skill
                </label>
                <select
                  id="skill"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-base focus:border-theme-base"
                  onChange={(e) => {
                    setCustomSkill(e.target.value);
                    if (e.target.value !== "Other") {
                      setCustomSkillInput("");
                    }
                  }}
                  required
                >
                  <option value="">Select a skill</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="UX/UI Design">UX/UI Design</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Other">Other (please specify)</option>
                </select>
                {customSkill === "Other" && (
                  <input
                    type="text"
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-base focus:border-theme-base"
                    placeholder="Please specify your skill"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                  />
                )}
              </div>

              <div>
                <label
                  htmlFor="programmingLanguage"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Select your preferred programming language
                </label>
                <select
                  id="programmingLanguage"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-base focus:border-theme-base"
                  onChange={(e) => {
                    setCustomLanguage(e.target.value);
                    if (e.target.value !== "Other") {
                      setCustomLanguageInput("");
                    }
                  }}
                  required
                >
                  <option value="">Select a programming language</option>
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Kotlin">Kotlin</option>
                  <option value="Dart">Dart</option>
                  <option value="SQL">SQL</option>
                  <option value="Other">Other (please specify)</option>
                </select>
                {customLanguage === "Other" && (
                  <input
                    type="text"
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-base focus:border-theme-base"
                    placeholder="Please specify your programming language"
                    value={customLanguageInput}
                    onChange={(e) => setCustomLanguageInput(e.target.value)}
                  />
                )}
              </div>

              <div>
                <label
                  htmlFor="github"
                  className="block text-base font-medium text-gray-700 mb-2"
                >
                  Enter your Github username
                </label>
                <input
                  type="text"
                  id="github"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-base focus:border-theme-base"
                  placeholder="e.g., jhondoe223"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
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
