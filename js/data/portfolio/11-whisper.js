export default {
  id: 'whisper',
  labels: {
    da: 'WhisperFrame',
    en: 'WhisperFrame'
  },
  translations: {
    da: 'Videotranskription og frame-udtrækning. Multi-format output med tidsstempler.',
    en: 'Video transcription and frame extraction. Multi-format output with timestamps.'
  },
  stack: ['Python', 'OpenAI Whisper', 'FFmpeg'],
  link: 'https://github.com/cocodedk/whisper',
  details: 'Transcription pipeline with frame extraction.',
  category: 'ai'
};
