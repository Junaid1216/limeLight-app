import { Colors } from '../Constants/Colors';
import { Strings } from '../Constants/Strings';

const BREAKDOWN_COLORS = {
  high: '#2F6FED',
  fair: '#2BC48A',
  low: '#F4A11A',
};

const normalizeOptionLabel = value =>
  String(value ?? '')
    .trim()
    .toLowerCase();

export const getSurveyOptionColor = label => {
  const normalized = normalizeOptionLabel(label);

  if (normalized.includes('high')) {
    return Colors.branchGreen;
  }

  if (normalized.includes('low')) {
    return Colors.vividAmber;
  }

  if (normalized.includes('fair')) {
    return Colors.teal;
  }

  return Colors.amber;
};

export const getBreakdownColor = label => {
  const normalized = normalizeOptionLabel(label);

  if (normalized.includes('high')) {
    return BREAKDOWN_COLORS.high;
  }

  if (normalized.includes('low')) {
    return BREAKDOWN_COLORS.low;
  }

  if (normalized.includes('fair')) {
    return BREAKDOWN_COLORS.fair;
  }

  return Colors.teal;
};

const mapSurveyOption = (option, index) => {
  if (typeof option === 'string') {
    return {
      id: index + 1,
      label: option,
    };
  }

  return {
    id: Number(option?.id ?? option?.option_id ?? index + 1),
    label:
      option?.label ??
      option?.name ??
      option?.option ??
      option?.text ??
      option?.value ??
      '',
  };
};

export const logSurveyEvent = (prefix, message, payload = {}) => {
  console.log(
    `${prefix} ${message}:`,
    JSON.stringify(payload, null, 2),
  );
};

export const mapSurveyListResponse = (responseBody = {}) => {
  let list = [];

  if (Array.isArray(responseBody?.data)) {
    list = responseBody.data;
  } else if (Array.isArray(responseBody)) {
    list = responseBody;
  } else if (Array.isArray(responseBody?.surveys)) {
    list = responseBody.surveys;
  }

  const surveys = list.map(item => {
    const submissionStatus = String(item?.submission_status ?? '').toLowerCase();

    return {
      id: Number(item?.id),
      title: item?.title ?? Strings.priceSatisfactionSurvey,
      status: String(item?.status ?? 'ACTIVE'),
      submissionStatus,
      questionsCount: Number(item?.questions_count ?? 0),
      questionsLabel:
        item?.questions_label ??
        `${item?.questions_count ?? 0} Questions`,
      isSubmitted:
        item?.is_submitted === true ||
        String(item?.is_submitted).toLowerCase() === 'true' ||
        submissionStatus === 'submitted',
    };
  });

  const activeSurvey =
    surveys.find(
      survey => !survey.isSubmitted && survey.status.toUpperCase() === 'ACTIVE',
    ) ??
    surveys.find(survey => !survey.isSubmitted) ??
    null;

  return {
    surveys,
    activeSurvey,
    hasPendingSurveys: surveys.some(survey => !survey.isSubmitted),
  };
};

const buildInitialAnswers = questions =>
  (questions ?? []).reduce((acc, question) => {
    if (question?.selectedOptionId == null) {
      return acc;
    }

    const selectedOption = question.options?.find(
      option => Number(option.id) === Number(question.selectedOptionId),
    );

    if (!selectedOption) {
      return acc;
    }

    acc[question.id] = {
      questionId: question.id,
      optionId: selectedOption.id,
      label: selectedOption.label,
    };

    return acc;
  }, {});

export const mapSurveyDetailResponse = (responseBody = {}) => {
  const data = responseBody?.data ?? responseBody ?? {};
  const list = data?.questions ?? data?.survey_questions ?? [];

  const questions = (Array.isArray(list) ? list : []).map((item, index) => {
    const rawOptions =
      item?.options ?? item?.answer_options ?? item?.choices ?? [];

    return {
      id: Number(item?.id ?? item?.question_id ?? index + 1),
      question: item?.question ?? item?.question_text ?? '',
      isRequired: item?.is_required !== false,
      selectedOptionId:
        item?.selected_option_id != null
          ? Number(item.selected_option_id)
          : null,
      options: (Array.isArray(rawOptions) ? rawOptions : []).map(mapSurveyOption),
    };
  });

  return {
    surveyId: Number(data?.id ?? data?.survey_id ?? null) || null,
    title: data?.title ?? data?.survey_title ?? Strings.priceSatisfactionSurvey,
    progressLabel: data?.progress_label ?? '',
    questions,
    initialAnswers: buildInitialAnswers(questions),
  };
};

export const buildSurveySubmitPayload = answers =>
  Object.values(answers ?? {})
    .filter(item => item?.questionId != null && item?.optionId != null)
    .map(item => ({
      question_id: Number(item.questionId),
      option_id: Number(item.optionId),
    }));

export const buildSurveySubmitFormData = answers => {
  const payload = buildSurveySubmitPayload(answers);
  const formData = new FormData();

  payload.forEach((item, index) => {
    formData.append(`answers[${index}][question_id]`, String(item.question_id));
    formData.append(`answers[${index}][option_id]`, String(item.option_id));
  });

  return formData;
};

export const getUserBranchId = userData =>
  userData?.branch_id ??
  userData?.branchId ??
  userData?.branch?.id ??
  userData?.data?.branch_id ??
  userData?.user?.branch_id ??
  null;

export const getUserBranchName = userData =>
  userData?.branch_name ??
  userData?.branch?.name ??
  userData?.data?.branch_name ??
  userData?.user?.branch_name ??
  userData?.branch ??
  '';

export const mapAsmBranchesResponse = data => {
  const payload = data?.data ?? data ?? {};
  const branches = payload?.branches ?? [];

  return (Array.isArray(branches) ? branches : []).map(item => ({
    label: item?.name ?? item?.branch_name ?? '',
    value: String(item?.branch_id ?? item?.id ?? ''),
  }));
};

const formatResponseRate = value => {
  if (value == null || value === '') {
    return '0%';
  }

  const text = String(value);

  return text.includes('%') ? text : `${text}%`;
};

export const mapSurveyReportResponse = data => {
  const payload = data ?? {};
  const stats = payload?.stats ?? {};
  const breakdownSource =
    payload?.breakdown ??
    payload?.response_breakdown ??
    payload?.responses_breakdown ??
    [];

  const breakdown = (Array.isArray(breakdownSource) ? breakdownSource : []).map(
    item => ({
      label: item?.label ?? item?.option ?? item?.name ?? '',
      value: Number(item?.percentage ?? item?.value ?? item?.percent ?? 0),
      color: item?.color ?? getBreakdownColor(item?.label ?? item?.option),
    }),
  );

  const branchesSource = payload?.branches ?? payload?.branch_list ?? [];
  const branches = (Array.isArray(branchesSource) ? branchesSource : []).map(
    item => ({
      label: item?.name ?? item?.branch_name ?? item?.label ?? '',
      value: String(item?.id ?? item?.branch_id ?? item?.value ?? ''),
    }),
  );

  const branch = payload?.branch ?? {};
  const survey = payload?.survey ?? {};
  const totalResponses = Number(
    stats?.total_responses ??
      payload?.total_responses ??
      payload?.summary?.total_responses ??
      payload?.completed ??
      payload?.responses ??
      0,
  );
  const totalStaff = Number(
    stats?.total_staff ??
      payload?.total_staff ??
      payload?.summary?.total_staff ??
      payload?.staff_total ??
      payload?.total ??
      0,
  );

  return {
    surveyId:
      survey?.id ??
      survey?.survey_id ??
      payload?.survey?.id ??
      payload?.survey_id ??
      payload?.active_survey_id ??
      null,
    reportTitle:
      payload?.survey_title ??
      survey?.title ??
      payload?.report_title ??
      payload?.category ??
      Strings.priceSatisfactionSurvey,
    title:
      survey?.title ??
      payload?.title ??
      payload?.survey_name ??
      '',
    status: survey?.status ?? payload?.status ?? 'Active',
    branchName:
      branch?.name ??
      branch?.branch_name ??
      payload?.branch_name ??
      '',
    branchId: branch?.id ?? branch?.branch_id ?? payload?.branch_id ?? null,
    branches,
    totalResponses,
    totalStaff,
    responseRate: formatResponseRate(
      stats?.response_rate ??
        stats?.response_rate_label ??
        payload?.response_rate ??
        payload?.summary?.response_rate ??
        payload?.response_rate_percentage,
    ),
    questions: Number(
      survey?.questions_count ??
        payload?.questions_count ??
        payload?.questions ??
        0,
    ),
    responsesLabel:
      stats?.responses_label ??
      payload?.responses_label ??
      payload?.summary?.responses_label ??
      `${totalResponses}/${totalStaff}`,
    breakdown,
    perQuestionBreakdown: Array.isArray(payload?.per_question_breakdown)
      ? payload.per_question_breakdown
      : [],
  };
};

const getStaffInitials = name => {
  if (!name) {
    return '';
  }

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase() ?? '')
    .join('');
};

const formatSubmittedAt = value => {
  if (!value) {
    return { date: '', time: '' };
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    const parts = String(value).split(',');

    return {
      date: parts[0]?.trim() ?? '',
      time: parts.slice(1).join(',').trim(),
    };
  }

  const date = parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
  const time = parsed.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return {
    date: `Submitted ${date},`,
    time,
  };
};

export const mapSurveyResponsesResponse = data => {
  const payload = data ?? {};
  const summary = payload?.summary ?? {};
  const branch = payload?.branch ?? {};
  const survey = payload?.survey ?? {};
  const list = payload?.responses ?? payload?.data ?? payload?.staff ?? [];

  return {
    survey,
    branch,
    totalStaff: Number(
      summary?.total_staff ??
        payload?.total_staff ??
        summary?.total ??
        payload?.total ??
        0,
    ),
    completed: Number(
      summary?.completed ??
        payload?.completed ??
        summary?.completed_count ??
        payload?.completed_count ??
        0,
    ),
    pending: Number(
      summary?.pending ??
        payload?.pending ??
        summary?.pending_count ??
        payload?.pending_count ??
        0,
    ),
    responses: (Array.isArray(list) ? list : []).map((item, index) => {
      const submitted = formatSubmittedAt(
        item?.submitted_at ?? item?.completed_at ?? item?.created_at,
      );
      const statusValue = String(item?.status ?? '').toLowerCase();
      const isCompleted =
        statusValue.includes('complete') || statusValue.includes('done');

      return {
        id: String(item?.id ?? item?.staff_id ?? index + 1),
        initials:
          item?.initials ?? getStaffInitials(item?.name ?? item?.staff_name),
        name: item?.name ?? item?.staff_name ?? '',
        code: item?.employee_code ?? item?.staff_code ?? item?.code ?? '',
        location:
          item?.branch ??
          item?.branch_name ??
          branch?.name ??
          branch?.branch_name ??
          '',
        status: isCompleted ? 'Completed' : 'Pending',
        date: submitted.date,
        time: submitted.time,
      };
    }),
  };
};

export const getSurveyResponseStatusParam = tabName => {
  const normalized = String(tabName ?? '').trim().toLowerCase();

  if (normalized === 'completed') {
    return 'completed';
  }

  if (normalized === 'pending') {
    return 'pending';
  }

  return 'all';
};
