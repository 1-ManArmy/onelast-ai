import React from 'react';

export default function Index() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-purple-900 text-white font-sans'>
      <header className='flex items-center justify-between px-6 py-4 border-b border-purple-700'>
        <h1 className='text-3xl font-bold tracking-wide'>🧠 One Last AI</h1>
        <span className='text-purple-400 italic'>“The mirror remembers.”</span>
      </header>

      <main className='px-6 py-10 max-w-3xl mx-auto'>
        <section className='mb-8'>
          <h2 className='text-xl font-semibold text-purple-300 mb-2'>✨ Recent Reflections</h2>
          <ul className='space-y-2 text-gray-300'>
            <li>“I felt stuck this morning… but pushed through.”</li>
            <li>“Anger during the meeting. Noted.”</li>
            <li>“Good flow in the afternoon sprint.”</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-purple-300 mb-2'>📝 New Entry</h2>
          <textarea className='w-full p-4 rounded bg-gray-900 border border-purple-600 text-white' rows={5} placeholder='Type what your mirror should remember...' />
        </section>
      </main>
    </div>
  );
}
