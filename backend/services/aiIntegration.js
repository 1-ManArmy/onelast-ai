const axios = require('axios');

class AIServiceIntegration {
  constructor() {
    this.openaiKey = process.env.AI_API_KEY;
    this.huggingfaceToken = process.env.HUGGINGFACE_API_TOKEN;
    this.openaiUrl = process.env.AI_API_URL || 'https://api.openai.com/v1';
    this.huggingfaceUrl = process.env.HUGGINGFACE_API_URL || 'https://api-inference.huggingface.co/models';
    
    // Mistral AI configuration
    this.mistralKey = process.env.MISTRAL_API_KEY;
    this.mistralUrl = process.env.MISTRAL_API_URL || 'https://api.mistral.ai/v1';
    
    // Google AI Studio configuration
    this.googleAiKey = process.env.GOOGLE_AI_API_KEY;
    this.googleAiUrl = process.env.GOOGLE_AI_STUDIO_URL || 'https://generativelanguage.googleapis.com/v1beta';
  }

  // OpenAI Integration
  async callOpenAI(prompt, model = 'gpt-4', options = {}) {
    try {
      const response = await axios.post(`${this.openaiUrl}/chat/completions`, {
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: options.maxTokens || 2000,
        temperature: options.temperature || 0.7,
        ...options
      }, {
        headers: {
          'Authorization': `Bearer ${this.openaiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error.response?.data || error.message);
      throw new Error('OpenAI API request failed');
    }
  }

  // Hugging Face Integration
  async callHuggingFace(input, model = 'gpt2', options = {}) {
    try {
      const response = await axios.post(`${this.huggingfaceUrl}/${model}`, {
        inputs: input,
        options: {
          wait_for_model: true,
          ...options
        }
      }, {
        headers: {
          'Authorization': `Bearer ${this.huggingfaceToken}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Hugging Face API Error:', error.response?.data || error.message);
      throw new Error('Hugging Face API request failed');
    }
  }

  // Mistral AI Integration
  async callMistral(prompt, model = 'mistral-small', options = {}) {
    try {
      const requestBody = {
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: options.temperature || 0.7
      };

      // Add max_tokens if provided
      if (options.maxTokens) {
        requestBody.max_tokens = options.maxTokens;
      }

      const response = await axios.post(`${this.mistralUrl}/chat/completions`, requestBody, {
        headers: {
          'Authorization': `Bearer ${this.mistralKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Mistral AI API Error:', JSON.stringify(error.response?.data, null, 2) || error.message);
      throw new Error('Mistral AI API request failed');
    }
  }

  // Google AI Studio Integration (Gemini)
  async callGoogleAI(prompt, model = 'gemini-1.5-flash', options = {}) {
    try {
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxTokens || 2000,
          topP: options.topP || 1,
          topK: options.topK || 1
        }
      };

      const response = await axios.post(
        `${this.googleAiUrl}/models/${model}:generateContent?key=${this.googleAiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Google AI API Error:', JSON.stringify(error.response?.data, null, 2) || error.message);
      throw new Error('Google AI API request failed');
    }
  }

  // TokBoost Service - Social Media Content Generation
  async generateTokBoostContent(platform, topic, style = 'engaging') {
    const prompt = `Generate ${style} social media content for ${platform} about: ${topic}. 
    Include relevant hashtags and engagement hooks. Make it viral-worthy and platform-optimized.`;
    
    return await this.callOpenAI(prompt, 'gpt-4', {
      temperature: 0.8,
      maxTokens: 500
    });
  }

  // YouGen Service - Content Creation
  async generateYouGenContent(contentType, niche, audience) {
    const prompt = `Create ${contentType} content for ${niche} targeting ${audience}. 
    Make it compelling, valuable, and shareable. Include a strong hook and call-to-action.`;
    
    return await this.callOpenAI(prompt, 'gpt-4', {
      temperature: 0.7,
      maxTokens: 1000
    });
  }

  // GPT-God Service - Advanced AI Operations
  async executeGPTGodTask(task, complexity = 'advanced') {
    const prompt = `As an AI expert, execute this ${complexity} task: ${task}. 
    Provide detailed analysis, step-by-step execution, and optimization recommendations.`;
    
    return await this.callOpenAI(prompt, 'gpt-4', {
      temperature: 0.6,
      maxTokens: 2000
    });
  }

  // CVSmash Service - Resume Optimization
  async optimizeResume(resumeText, jobDescription, atsScore = 73) {
    const prompt = `Optimize this resume for ATS systems and the job description provided.
    Current ATS Score: ${atsScore}%. Target: 97%+
    
    Resume: ${resumeText}
    Job Description: ${jobDescription}
    
    Provide optimized content with ATS keywords, improved formatting suggestions, and skill enhancements.`;
    
    return await this.callOpenAI(prompt, 'gpt-4', {
      temperature: 0.5,
      maxTokens: 1500
    });
  }

  // ChatRevive Service - Conversation Memory Restoration
  async resurrectConversation(chatLogs, context = '') {
    const prompt = `Analyze these chat logs and extract:
    1. Conversation context and history
    2. AI personality and tone patterns
    3. Relationship dynamics and memory points
    4. System prompt for continuation
    
    Chat Logs: ${chatLogs}
    Additional Context: ${context}
    
    Generate a comprehensive memory restoration profile for seamless conversation continuation.`;
    
    return await this.callOpenAI(prompt, 'gpt-4', {
      temperature: 0.4,
      maxTokens: 2000
    });
  }

  // AgentX Service - AI Agent Automation
  async createAgentXTask(taskDescription, agentType = 'general') {
    const prompt = `Create an AI agent configuration for: ${taskDescription}
    Agent Type: ${agentType}
    
    Include:
    - Agent objectives and capabilities
    - Execution strategy
    - Monitoring and optimization protocols
    - Integration requirements`;
    
    return await this.callOpenAI(prompt, 'gpt-4', {
      temperature: 0.6,
      maxTokens: 1200
    });
  }

  // VisionCraft Service - Computer Vision (using Hugging Face)
  async analyzeImage(imageUrl, task = 'describe') {
    try {
      // Using Hugging Face vision models
      const response = await this.callHuggingFace(imageUrl, 'Salesforce/blip-image-captioning-large', {
        task: task
      });
      return response;
    } catch (error) {
      console.error('VisionCraft Error:', error);
      throw error;
    }
  }

  // Mistral AI Services - Leveraging European AI capabilities
  async generateWithMistral(prompt, options = {}) {
    return await this.callMistral(prompt, 'mistral-small', {
      temperature: 0.7,
      maxTokens: 2000,
      ...options
    });
  }

  async codeAnalysisWithMistral(code, language, task = 'analyze') {
    const prompt = `As an expert ${language} developer, ${task} this code:
    
    \`\`\`${language}
    ${code}
    \`\`\`
    
    Provide detailed analysis, suggestions for improvement, potential bugs, and optimization opportunities.`;
    
    return await this.callMistral(prompt, 'mistral-small', {
      temperature: 0.4,
      maxTokens: 1500
    });
  }

  async multilingualSupportWithMistral(text, targetLanguage, task = 'translate') {
    const prompt = `${task === 'translate' ? 'Translate' : 'Analyze'} the following text ${task === 'translate' ? `to ${targetLanguage}` : `for language patterns and cultural context`}:
    
    "${text}"
    
    ${task === 'translate' ? 'Provide an accurate, contextually appropriate translation.' : 'Provide linguistic analysis and cultural insights.'}`;
    
    return await this.callMistral(prompt, 'mistral-small', {
      temperature: 0.3,
      maxTokens: 1000
    });
  }

  // Google AI Studio Services - Leveraging Gemini capabilities
  async generateWithGoogleAI(prompt, options = {}) {
    return await this.callGoogleAI(prompt, 'gemini-1.5-flash', {
      temperature: 0.7,
      maxTokens: 2000,
      ...options
    });
  }

  async visionAnalysisWithGoogleAI(imageBase64, prompt, options = {}) {
    try {
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: options.temperature || 0.4,
          maxOutputTokens: options.maxTokens || 1000
        }
      };

      const response = await axios.post(
        `${this.googleAiUrl}/models/gemini-1.5-flash:generateContent?key=${this.googleAiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Google AI Vision Error:', JSON.stringify(error.response?.data, null, 2) || error.message);
      throw new Error('Google AI Vision request failed');
    }
  }

  async reasoningWithGoogleAI(question, context = '', options = {}) {
    const prompt = `Question: ${question}
    ${context ? `Context: ${context}` : ''}
    
    Please provide a detailed, step-by-step reasoning and analysis to answer this question.`;
    
    return await this.callGoogleAI(prompt, 'gemini-1.5-flash', {
      temperature: 0.3,
      maxTokens: 2000,
      ...options
    });
  }
}

module.exports = AIServiceIntegration;
