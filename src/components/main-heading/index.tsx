function MainHeading({ title, subTitle }: { title: string; subTitle: string }) {
  return (
    <>
      <span className="uppercase text-accent font-semibold leading-4">
        {subTitle}
      </span>
      <h2 className="text-4xl text-primary italic font-bold">{title}</h2>
    </>
  );
}

export default MainHeading;
