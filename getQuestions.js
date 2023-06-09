import { dbPoolAsync } from "./dbPool.js";

export const getQuestions = async () => {
    const questions = (
        await dbPoolAsync.query(
            "select * from question where section_question = 1"
        )
    )[0];

    let data = questions.map((question) => ({
        id: question.id_question,
        question: question.text,
        options: [],
    }));

    for (let index = 0; index < data.length; index++) {
        const question = data[index];

        const optionsIds = (
            await dbPoolAsync.query(
                "select options_id_option from options_has_question where question_id_question = ?",
                question.id
            )
        )[0];

        let options = [];

        for (let { options_id_option } of optionsIds) {
            const queryData = (
                await dbPoolAsync.query(
                    "select value from options where id_option = ?",
                    options_id_option
                )
            )[0][0];
            options.push({ id: options_id_option, value: queryData.value });
        }

        data[index] = { ...question, options };
    }

    return data;
};
