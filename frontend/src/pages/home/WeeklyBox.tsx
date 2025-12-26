{/* 
    Title: Weekly Special
    Picture: /images/weekly-special.jpg (box)
    Price label (on picture): $10
    Description: Here is our weekly special box of macarons, where we make a box of 7 assorted macarons
                    with three different flavours of our choice every week, which will be updated both here
                    and on our Instagram page.
    List: This Week's Flavours (3):
      - chocolate
      - salted caramel
      - pistachio
*/}

const WeeklyBox = () => {
  const weeklyFlavours = ["Chocolate", "Salted Caramel", "Pistachio"];

  return (
    <div className="weekly-special">
      <h1>Weekly Special</h1>
      <p>
        Here is our weekly special box of macarons, where we make a box of 7 assorted macarons
            with three different flavours of our choice every week, which will be updated both
            here and on our Instagram page.
      </p>

      <div className="narrow-wrapper">
        <div className="weekly-special-content">
          {/* Image with price tag */}
          <div className="weekly-special-image">
            <img
              src="flavours/weekly_special.png"
              alt="Weekly Special Box"
            />
            <span className="price-tag">$10</span>
          </div>

          {/* Flavours list */}
          <div className="weekly-special-flavours">
            <h3>This Week's Flavours</h3>
            <ul>
              {weeklyFlavours.map((flavour) => (
                <li key={flavour}>{flavour}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyBox;