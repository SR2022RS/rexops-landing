import { useState, useRef } from 'react'
import { Room, RoomEvent, Track } from 'livekit-client'
import './voice-widget.css'

export default function VoiceWidget() {
  const [state, setState] = useState('idle')
  const roomRef = useRef(null)

  async function startCall() {
    setState('connecting')
    try {
      const res = await fetch(import.meta.env.VITE_TOKEN_ENDPOINT)
      const { token, url } = await res.json()

      const room = new Room()
      roomRef.current = room

      room.on(RoomEvent.Disconnected, () => setState('ended'))
      room.on(RoomEvent.TrackSubscribed, (track) => {
        if (track.kind === Track.Kind.Audio) {
          track.attach()
        }
      })

      await room.connect(url, token)
      await room.localParticipant.setMicrophoneEnabled(true)
      setState('connected')
    } catch (err) {
      console.error('Voice connection failed:', err)
      setState('idle')
    }
  }

  async function endCall() {
    if (roomRef.current) {
      await roomRef.current.disconnect()
      roomRef.current = null
    }
    setState('ended')
  }

  if (state === 'idle') return (
    <button className="voice-btn voice-btn--idle" onClick={startCall}>
      <span className="voice-btn__icon">🎙</span>
      Talk to an agent
    </button>
  )

  if (state === 'connecting') return (
    <button className="voice-btn voice-btn--connecting" disabled>
      <span className="voice-btn__pulse" />
      Connecting...
    </button>
  )

  if (state === 'connected') return (
    <div className="voice-active">
      <div className="voice-active__status">
        <span className="voice-active__dot" />
        Live with Alex
      </div>
      <button className="voice-btn voice-btn--end" onClick={endCall}>
        End call
      </button>
    </div>
  )

  if (state === 'ended') return (
    <div className="voice-ended">
      <p>Thanks for chatting — we'll be in touch within 48 hours.</p>
      <button className="voice-btn voice-btn--idle" onClick={() => setState('idle')}>
        Talk again
      </button>
    </div>
  )
}
