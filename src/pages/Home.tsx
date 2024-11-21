import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Coffee, Check, Sparkles, Rocket, Star, Lightbulb } from 'lucide-react';
import { genAI } from '@/lib/gemini';

export default function Home() {
  const [description, setDescription] = useState('');
  const [slogans, setSlogans] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateSlogans = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!genAI) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate 5 creative, memorable, and professional business slogans for a business with this description: ${description}. Return only the slogans, one per line.`;
      
      const result = await model.generateContent(prompt);
      const sloganList = result.response.text().split('\n').filter(slogan => slogan.trim());
      setSlogans(sloganList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating slogans');
      setSlogans([]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 py-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text leading-tight">
            AI Business Slogan Generator ✨
          </h1>
          <p className="text-xl text-gray-600">
            Transform your business description into compelling slogans using our free AI Business Slogan Generator! 🚀
          </p>
        </div>
        
        <div className="gradient-border mb-8">
          <div className="p-8">
            <div className="space-y-6">
              <Textarea
                placeholder="✍️ Describe your business..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] text-lg border-2 focus:border-orange-400"
              />
              
              <Button 
                onClick={generateSlogans}
                disabled={loading || !description.trim()}
                className="w-full text-lg py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-5 w-5" />
                    Generate Slogans ✨
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rest of the component remains unchanged */}
        {slogans.length > 0 && (
          <div className="space-y-4 mb-12">
            {slogans.map((slogan, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-200">
                <div className="flex justify-between items-center gap-4">
                  <p className="text-lg flex-grow">{slogan}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(slogan, index)}
                    className="flex items-center gap-2 min-w-[120px] hover:bg-orange-50"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Copied! ✅</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Card className="p-8 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 mb-16">
          <div className="text-center space-y-4">
            <Coffee className="h-12 w-12 mx-auto text-orange-500" />
            <h2 className="text-2xl font-bold">Support Our Work ❤️</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Help us maintain and improve our AI tools by supporting our API & hosting costs. 
              Your contribution helps keep this tool free for everyone! 🙏
            </p>
            <a
              href="https://roihacks.gumroad.com/coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Coffee className="mr-2 h-5 w-5" />
                Buy Us a Coffee ☕
              </Button>
            </a>
          </div>
        </Card>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-xl p-8 mb-16">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
              Free AI Business Slogan Generator: Create Memorable Taglines in Seconds ⚡
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Looking for the perfect slogan for your business? Our free AI-powered business slogan generator
                combines cutting-edge artificial intelligence with creative expertise to help entrepreneurs
                and marketers create compelling, memorable taglines that capture their brand's essence.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-6 w-6 text-orange-500" />
                  Why Choose Our Free AI Slogan Generator? 🎯
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">🚀</span>
                    <span>Instant generation of creative and unique slogans tailored to your business</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🤖</span>
                    <span>AI-powered technology that understands your business context and industry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⚡</span>
                    <span>Save valuable time and resources in your branding process</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    <span>Get multiple professional options to choose from instantly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💎</span>
                    <span>Free to use with professional-quality results</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-orange-500" />
                  The Power of AI in Business Slogan Generation 💫
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced AI technology analyzes successful marketing campaigns, understands linguistic
                  patterns, and combines this knowledge with your specific business context. This results
                  in slogans that are not only creative but also:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span>📈</span> Memorable and impactful
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🎯</span> Targeted to your audience
                  </li>
                  <li className="flex items-center gap-2">
                    <span>💡</span> Unique to your brand
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🌟</span> Professional and polished
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Who Should Use This AI Business Slogan Generator 🏢</h3>
                <p className="text-gray-600 leading-relaxed">
                  Whether you're a startup crafting your first brand message or an established business
                  looking to refresh your identity, our AI business slogan generator is perfect for:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>• E-commerce businesses seeking catchy taglines</li>
                  <li>• Local businesses wanting to stand out</li>
                  <li>• Tech startups needing innovative slogans</li>
                  <li>• Service providers looking to communicate value</li>
                  <li>• Personal brands seeking memorable phrases</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">How to Get the Best Results From this AI Business Slogan Generator? 🎯</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Be specific about your business's unique value proposition</li>
                  <li>Include your target audience and industry</li>
                  <li>Mention any key benefits or features you want to highlight</li>
                  <li>Generate multiple options to find the perfect match</li>
                  <li>Test different variations of your business description</li>
                </ol>
              </div>
            </div>
          </article>
        </div>

        <Card className="p-8 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 mb-16">
          <div className="text-center space-y-4">
            <Coffee className="h-12 w-12 mx-auto text-orange-500" />
            <h2 className="text-2xl font-bold">Love Our Tool? Support Its Growth! 🚀</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Your support helps us maintain our AI infrastructure, improve the tool's capabilities,
              and keep it accessible to everyone. Every coffee counts! ☕
            </p>
            <div className="pt-2">
              <a
                href="https://roihacks.gumroad.com/coffee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  <Coffee className="mr-2 h-5 w-5" />
                  Buy Us a Coffee ☕
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}