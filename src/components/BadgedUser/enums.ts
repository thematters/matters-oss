import { USER_BADGE_TYPES } from '../../definitions'

export const USER_BADGES: {
  [key in USER_BADGE_TYPES]: { text: string; color: string }
} = {
  seed: { text: '種子用戶', color: '#F3D26E' },
  golden_motor: { text: '金馬達', color: '#C0A46B' },
  architect: { text: '馬特市建築師', color: '#DC752B' },
  nomad1: { text: '月之夢', color: '#00447c' },
  nomad2: { text: '流星號', color: '#066320' },
  nomad3: { text: '光輪號', color: '#5b0707' },
  nomad4: { text: '火閃電', color: '#bf9604' },
}
