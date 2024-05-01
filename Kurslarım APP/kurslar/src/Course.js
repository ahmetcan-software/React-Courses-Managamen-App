function Course({ kurs, removeOneCourse }) {
  // Coursescompenendinden gönderilen kurs adlı propsu burda yakalıyoruz.
  // todo artık datalarımı burada ekrana basabilirim
  return (
    <div className="card">
      <div className="cardTitlePrice">
        <h2 className="cardTitle">{kurs.title}</h2>
        <h4 className="cardPrice">{kurs.price}TL</h4>
      </div>
      <p className="contentCourse">{kurs.content}</p>

      <button
        className="cardDeleteBtn"
        onClick={() => removeOneCourse(kurs.id)}
      >
        Sil
      </button>
    </div>
  );
}

export default Course;
