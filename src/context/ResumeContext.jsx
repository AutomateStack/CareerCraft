import { createContext, useContext, useReducer, useEffect } from 'react';

const ResumeContext = createContext();

const defaultResume = {
  template: 'modern',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    location: '',
    portfolio: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
};

function loadFromStorage() {
  try {
    const saved = localStorage.getItem('careercraft_resume');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultResume, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load resume from localStorage:', e);
  }
  return defaultResume;
}

function resumeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };

    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, [action.field]: action.value },
      };

    case 'ADD_ENTRY': {
      const list = [...(state[action.section] || []), action.entry];
      return { ...state, [action.section]: list };
    }

    case 'UPDATE_ENTRY': {
      const items = [...state[action.section]];
      items[action.index] = { ...items[action.index], ...action.data };
      return { ...state, [action.section]: items };
    }

    case 'REMOVE_ENTRY': {
      const filtered = state[action.section].filter((_, i) => i !== action.index);
      return { ...state, [action.section]: filtered };
    }

    case 'REORDER_ENTRIES': {
      const reordered = [...state[action.section]];
      const [removed] = reordered.splice(action.fromIndex, 1);
      reordered.splice(action.toIndex, 0, removed);
      return { ...state, [action.section]: reordered };
    }

    case 'SET_TEMPLATE':
      return { ...state, template: action.template };

    case 'RESET':
      return { ...defaultResume };

    case 'LOAD':
      return { ...defaultResume, ...action.data };

    default:
      return state;
  }
}

export function ResumeProvider({ children }) {
  const [resume, dispatch] = useReducer(resumeReducer, null, loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem('careercraft_resume', JSON.stringify(resume));
    } catch (e) {
      console.warn('Failed to save resume to localStorage:', e);
    }
  }, [resume]);

  const updateField = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  const updatePersonalInfo = (field, value) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', field, value });
  };

  const addEntry = (section, entry) => {
    dispatch({ type: 'ADD_ENTRY', section, entry });
  };

  const updateEntry = (section, index, data) => {
    dispatch({ type: 'UPDATE_ENTRY', section, index, data });
  };

  const removeEntry = (section, index) => {
    dispatch({ type: 'REMOVE_ENTRY', section, index });
  };

  const reorderEntries = (section, fromIndex, toIndex) => {
    dispatch({ type: 'REORDER_ENTRIES', section, fromIndex, toIndex });
  };

  const setTemplate = (template) => {
    dispatch({ type: 'SET_TEMPLATE', template });
  };

  const resetResume = () => {
    dispatch({ type: 'RESET' });
    localStorage.removeItem('careercraft_resume');
  };

  const getCompletionPercentage = () => {
    let total = 0;
    let filled = 0;

    // Personal info fields
    const infoFields = Object.values(resume.personalInfo);
    total += infoFields.length;
    filled += infoFields.filter(v => v && v.trim() !== '').length;

    // Summary
    total += 1;
    if (resume.summary.trim()) filled += 1;

    // Sections with entries
    const sections = ['experience', 'education', 'skills', 'projects'];
    sections.forEach(s => {
      total += 1;
      if (resume[s] && resume[s].length > 0) filled += 1;
    });

    return Math.round((filled / total) * 100);
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        updateField,
        updatePersonalInfo,
        addEntry,
        updateEntry,
        removeEntry,
        reorderEntries,
        setTemplate,
        resetResume,
        getCompletionPercentage,
        dispatch,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}

export default ResumeContext;
