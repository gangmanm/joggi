import * as S from "../../styles/day/tag";

interface TagProps {
  setting: string;
}

export default function Tag({ setting }: TagProps) {
  return (
    <S.TagContainer>
      <S.TagBox setting={setting}></S.TagBox>
      <S.TagBox setting={setting}></S.TagBox>
      <S.TagBox setting={setting}></S.TagBox>
      <S.TagBox setting={setting}></S.TagBox>
      <S.TagBox setting={setting}></S.TagBox>
    </S.TagContainer>
  );
}
